import ICreateEquipmentDataDTO from "../dtos/ICreateEquipmentDataDTO";


export interface IEquipmentCommand {
  channel: number;
  onOff: boolean;
  activation: number;
}

export function splitData(data:String): ICreateEquipmentDataDTO {
  const splitedData = data.split(',');
  const outputs = convertDeciamlToBinary(Number(splitedData.pop()))
  const uv = uvIndex(Number(splitedData[3]))
  const soilHumidity = soilHumidityCalc(Number(splitedData[5]))

  return {
    equipment_id: 1,
    fan: Boolean(Number(outputs[0])),
    heater: Boolean(Number(outputs[1])),
    sombrite: Boolean(Number(outputs[2])),
    water_pump: Boolean(Number(outputs[3])),
    temperature: Number(splitedData[0]),
    humidity: Number(splitedData[1]),
    water_flow: 0,
    soil_humidity: soilHumidity,
    uv: uv
  }
}

export function formatCommand(command: IEquipmentCommand): string {
  return `${String.fromCharCode(62)}CD:${command.channel}:${Number(command.onOff)}:${command.activation}${String.fromCharCode(60)}`
}

function soilHumidityCalc(value: number):number {
  return 100 * ((978 - value) / 978)
}

function uvIndex(value:number):number {
  let index = 0;

  if(value > 10 && value <= 46) {
    return 1;
  }

  if(value > 46 && value <= 65) {
    return 2;
  }

  if(value > 65 && value <= 83) {
    return 3;
  }

  if(value > 83 && value <= 103) {
    return 4;
  }

  if(value > 103 && value <= 124) {
    return 5;
  }

  if(value > 124 && value <= 142) {
    return 6;
  }

  if(value > 142 && value <= 162) {
    return 7;
  }

  if(value > 162 && value <= 180) {
    return 8;
  }

  if(value > 180 && value <= 200) {
    return 9;
  }

  if(value > 200 && value <= 221) {
    return 10;
  }

  if(value > 240) {
    return 11;
  }

  return index;
}

function convertDeciamlToBinary(value: number): String[] {
  const binaryArray = value.toString(2).split('')

  return binaryArray;
}


