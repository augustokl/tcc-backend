import ExecutedCommandController from '@modules/equipments/infra/local/controllers/ExecutedCommandController'
import { EquipmentChannel } from './EquipmentChannel'


export interface IExecutedToday {
  openSombrite: boolean
  closeSombrite: boolean
  day: number
}

const open = `B,${EquipmentChannel.open_sombrite},OK`;
const close = `B,${EquipmentChannel.close_sombrite},OK`;
const day = new Date().getDate()


export async function searchExecuted(executedCommandController: ExecutedCommandController): Promise<IExecutedToday> {
  const openedSombrite = await executedCommandController.find(open)
  const closedSombrite = await executedCommandController.find(close)

  const executedToday = {
    openSombrite: openedSombrite,
    closeSombrite: closedSombrite,
    day
  }

  return executedToday
}

export async function checkCommandSombrite(
  command: string, executedCommandController:
  ExecutedCommandController,
  executedToday:IExecutedToday): Promise<IExecutedToday>{
    command = command.trimEnd();
    await executedCommandController.create({command})

    if (command === open){
      executedToday.openSombrite = true
      executedToday.day = day
    }
    if (command === close){
      executedToday.closeSombrite = true
      executedToday.day = day
    }

    return executedToday
}
