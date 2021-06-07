import 'reflect-metadata';
import 'dotenv/config';

import Net from 'net'
import {isAfter, isBefore} from 'date-fns'
import { isEqual } from 'lodash'

import ConfigurationsAutomatic from '@modules/configurations/infra/http/controllers/ConfigurationsAutomatic'
import ConfigurationsManual from '@modules/configurations/infra/http/controllers/ConfigurationsManual'
import EquipmentsController from '@modules/equipments/infra/http/controllers/EquipmentsController'
import ExecutedCommandController from '@modules/equipments/infra/local/controllers/ExecutedCommandController'
import ManualConf from '@modules/configurations/infra/typeorm/entities/ManualConf';
import { checkCommandSombrite, searchExecuted } from '@modules/equipments/utils/executedCommand';
import { addToQueue, checkNeedChange, IEquipmentCommand, splitData } from '@modules/equipments/utils/utils';
import { EquipmentChannel } from '@modules/equipments/utils/EquipmentChannel';

const port = 7090;
const server = new Net.Server();
const configurationsAutomatic = new ConfigurationsAutomatic()
const configurationsManual = new ConfigurationsManual()
const equipmentsController = new EquipmentsController()
const executedCommandController = new ExecutedCommandController()

let previousManual:ManualConf;

let commandQueue: string[] = []


import '@shared/infra/typeorm';
import '@shared/container';

server.listen(port, function() {
    console.log(`Server listening for connection requests on socket localhost:${port}`);
});

server.on('connection', async function(socket) {
    console.log('A new connection has been established.');

    let executedTodaySombrite = await searchExecuted(executedCommandController)

    console.log(executedTodaySombrite)

    socket.on('data', async function(chunk) {
        const confAuto = await configurationsAutomatic.findLocal()
        const confManual = await configurationsManual.findLocal()
        const command = {} as IEquipmentCommand

        const received = chunk.toString();
        console.log(received)

        if (received.charAt(0) != 'B'){

          const data = splitData(received, executedTodaySombrite);
          await equipmentsController.create(data)

          console.log(`Data received from client: ${chunk.toString()}`);

          if (confManual?.active) {
            if(isEqual(previousManual, confManual)){
              return;
            }

            console.log('Manual')

            commandQueue = checkNeedChange(confManual, previousManual, commandQueue)

            previousManual = confManual

          } else {

            console.log('Automatic: ' + new Date())

            const now = new Date()
            const dateOpenSombrite: string[] | undefined = confAuto?.open_sombrite.split(':')
            const openDate = new Date()
            const dateCloseSombrite: string[] | undefined = confAuto?.close_sombrite.split(':')
            const closeDate = new Date()

            openDate.setHours(Number(dateOpenSombrite && dateOpenSombrite[0]))
            openDate.setMinutes(Number(dateOpenSombrite && dateOpenSombrite[1]))
            closeDate.setHours(Number(dateCloseSombrite && dateCloseSombrite[0]))
            closeDate.setMinutes(Number(dateCloseSombrite && dateCloseSombrite[1]))

            if(isBefore(now, openDate) && isAfter(now, closeDate) && !data.sombrite){
              command.activation = 1;
              command.onOff = true;
              command.channel = EquipmentChannel.close_sombrite
              commandQueue = addToQueue(command, commandQueue)
              executedTodaySombrite.closeSombrite = true;
            }

            if(isAfter(now, openDate) && data.sombrite) {
              command.activation = 1;
              command.onOff = true;
              command.channel = EquipmentChannel.open_sombrite
              commandQueue = addToQueue(command, commandQueue)
              executedTodaySombrite.openSombrite = true;
            }

            if(confAuto?.min_temperature && data.temperature < confAuto?.min_temperature) {
              command.activation = 0;
              command.onOff = true;
              command.channel = EquipmentChannel.heater
              commandQueue = addToQueue(command, commandQueue)
            }

            if(confAuto?.max_temperature && !data.fan && data.temperature > confAuto?.max_temperature) {
              command.activation = 0;
              command.onOff = true;
              command.channel = EquipmentChannel.fan
              commandQueue = addToQueue(command, commandQueue)
            }

            if(confAuto?.min_temperature &&
                confAuto?.max_temperature &&
                (data.heater || data.fan) &&
                data.temperature > confAuto?.min_temperature &&
                data.temperature < confAuto?.max_temperature
              ) {
              command.activation = 0;
              command.onOff = false;
              command.channel = EquipmentChannel.fan
              commandQueue = addToQueue(command, commandQueue)

              command.activation = 0;
              command.onOff = false;
              command.channel = EquipmentChannel.heater
              commandQueue = addToQueue(command, commandQueue)
            }

            if(confAuto?.min_humidity && !data.water_pump && data.soil_humidity < confAuto?.min_humidity) {
              command.activation = confAuto.activation_time;
              command.onOff = true;
              command.channel = EquipmentChannel.water_pump
              commandQueue = addToQueue(command, commandQueue)
            }

            if(confAuto?.min_humidity && data.water_pump && data.soil_humidity > confAuto?.min_humidity) {
              command.activation = 0
              command.onOff = false;
              command.channel = EquipmentChannel.water_pump
              commandQueue = addToQueue(command, commandQueue)
            }
          }
      } else {
        executedTodaySombrite = await checkCommandSombrite(received, executedCommandController, executedTodaySombrite)
      }

      if (commandQueue.length) {
        setTimeout(() => {
          const command = '' + commandQueue.shift()
          console.log(`sending command: ${command.trim()}, queue status: ${commandQueue.length}`)
          console.log(`still in queue: ${commandQueue.toString()} `)
          socket.write(command)
        }, 3000)
      }
    });


    socket.on('end', function() {
        console.log('Closing connection with the client');
    });

    socket.on('error', function(err) {
        console.log(`Error: ${err}`);
    });
});
