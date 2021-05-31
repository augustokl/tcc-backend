import ICreateEquipmentDataDTO from "../dtos/ICreateEquipmentDataDTO";
import { EquipmentChannel } from "./EquipmentChannel";
import { IExecutedToday } from "./executedCommand";

export interface IEquipmentCommand {
  channel: number;
  onOff: boolean;
  activation: number;
}

interface IRangeCalc {
  value: number;
  inMin: number;
  inMax: number;
  outMin: number;
  outMax: number;
}

export function splitData(data:String, executedToday: IExecutedToday): ICreateEquipmentDataDTO {
  const splitedData = data.split(',');
  const outputs = convertDeciamlToBinary(Number(splitedData.pop()))
  const uv = uvIndex(Number(splitedData[3]))
  const soilRange = {
    value: Number(splitedData[5]),
    inMin: 377,
    inMax: 1023,
    outMin: 100,
    outMax: 0,
  }

  const soilHumidity = soilHumidityCalc(soilRange)

  return {
    fan: Boolean(Number(outputs[EquipmentChannel.fan])),
    heater: Boolean(Number(outputs[EquipmentChannel.heater])),
    sombrite: Boolean(),
    water_pump: Boolean(Number(outputs[EquipmentChannel.water_pump])),
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
  const formattedCommand = `${String.fromCharCode(62)}CD,${command.channel},${Number(command.onOff)},${command.activation}${String.fromCharCode(60)}\r\n`;
  return formattedCommand
}

function checkSombriteStatus(executedToday: IExecutedToday): boolean {
  const today = new Date().getDate()

  if (today !== executedToday.day) {
    executedToday.openSombrite = false
    executedToday.closeSombrite = false

    return false
  }

  if (executedToday.openSombrite && !executedToday.closeSombrite) {
    return true
  }

  return false
}

function soilHumidityCalc({value, inMin, inMax, outMin, outMax}: IRangeCalc):number {
  return Math.round((value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin)
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


