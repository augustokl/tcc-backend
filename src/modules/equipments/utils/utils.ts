import ICreateEquipmentDataDTO from "../dtos/ICreateEquipmentDataDTO";
import { EquipmentChannel } from "./EquipmentChannel";



export interface IEquipmentCommand {
  channel: number;
  onOff: boolean;
  activation: number;
}

export function splitData(data:String): ICreateEquipmentDataDTO {
  const splitedData = data.split(',');
  // const outputs = convertDeciamlToBinary(Number(splitedData.pop()))
  const uv = uvIndex(Number(splitedData[3]))
  const soilHumidity = soilHumidityCalc(Number(splitedData[5]))

  // return {
  //   equipment_id: 1,
  //   fan: Boolean(Number(outputs[EquipmentChannel.fan])),
  //   heater: Boolean(Number(outputs[EquipmentChannel.heater])),
  //   sombrite: Boolean(Number(outputs[EquipmentChannel.sombrite])),
  //   water_pump: Boolean(Number(outputs[EquipmentChannel.water_pump])),
  //   temperature: Number(splitedData[0]),
  //   humidity: Number(splitedData[1]),
  //   water_flow: 0,
  //   soil_humidity: soilHumidity,
  //   uv: uv
  // }
   return {
    fan: false,
    heater: false,
    sombrite: false,
    water_pump: false,
    temperature: Number(splitedData[0]),
    humidity: Number(splitedData[1]),
    water_flow: 0,
    soil_humidity: soilHumidity,
    uv: uv
  }
}

export function addToQueue(command: IEquipmentCommand, queue: string[]): string[] {
  const formattedComand = formatCommand(command)
  if(!queue.includes(formattedComand)){
    queue.push(formattedComand)
  }

  return queue
}

function formatCommand(command: IEquipmentCommand): string {
  const formattedCommand = `${String.fromCharCode(62)}CD,${command.channel},${Number(command.onOff)},${command.activation}${String.fromCharCode(60)}`;
  console.log(formattedCommand)
  return formattedCommand
}

function soilHumidityCalc(value: number):number {
  return 100 * ((1023 - value) / 1023)
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


