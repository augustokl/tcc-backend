import ExecutedCommandController from '@modules/equipments/infra/local/controllers/ExecutedCommandController'
import { EquipmentChannel } from './EquipmentChannel'


export interface IExecutedToday {
  openSombrite: boolean
  closeSombrite: boolean
  day: number
}

export async function searchExecuted(executedCommandController: ExecutedCommandController): Promise<IExecutedToday> {
  const openedSombrite = await executedCommandController.find(`B:${EquipmentChannel.open_sombrite}:OK`)
  const closedSombrite = await executedCommandController.find(`B:${EquipmentChannel.close_sombrite}:OK`)
  const day = new Date().getDate()

  const executedToday = {
    openSombrite: openedSombrite,
    closeSombrite: closedSombrite,
    day
  }

  return executedToday
}
