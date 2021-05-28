import 'reflect-metadata';
import 'dotenv/config';

import Net from 'net'
import {isAfter, isBefore} from 'date-fns'

import ConfigurationsAutomatic from '@modules/configurations/infra/http/controllers/ConfigurationsAutomatic'
import ConfigurationsManual from '@modules/configurations/infra/http/controllers/ConfigurationsManual'
import EquipmentsController from '@modules/equipments/infra/http/controllers/EquipmentsController'
import { formatCommand, IEquipmentCommand, splitData } from '@modules/equipments/utils/utils';
import {EquipmentChannel} from '@modules/equipments/utils/EquipmentChannel';

const port = 7090;
const server = new Net.Server();
const configurationsAutomatic = new ConfigurationsAutomatic()
const configurationsManual = new ConfigurationsManual()
const equipmentsController = new EquipmentsController()


import '@shared/infra/typeorm';
import '@shared/container';

server.listen(port, function() {
    console.log(`Server listening for connection requests on socket localhost:${port}`);
});

server.on('connection', function(socket) {
    console.log('A new connection has been established.');

    socket.on('data', async function(chunk) {
        const confAuto = await configurationsAutomatic.findLocal()
        const confManual = await configurationsManual.findLocal()
        const command = {} as IEquipmentCommand

        const received = chunk.toString();
        console.log(received)

        if (received.charAt(0) != 'B'){

          const data = splitData(received);
          await equipmentsController.create(data)

          console.log(`Data received from client: ${chunk.toString()}`);

          if (confManual?.active) {

            if (confManual.fan){
              command.activation = 0;
              command.onOff = true;
              command.channel = EquipmentChannel.fan
              const formated = await formatCommand(command)
              socket.write(formated)
            } else {
              command.activation = 0;
              command.onOff = false;
              command.channel = EquipmentChannel.fan
              const formated = await formatCommand(command)
              socket.write(formated)
            }

            if (confManual.humidity){
              command.activation = 0;
              command.onOff = true;
              command.channel = EquipmentChannel.water_pump
              const formated = await formatCommand(command)
              socket.write(formated)
            } else {
              command.activation = 0;
              command.onOff = false;
              command.channel = EquipmentChannel.water_pump
              const formated = await formatCommand(command)
              socket.write(formated)
            }

            if (confManual.temperature){
              command.activation = 0;
              command.onOff = true;
              command.channel = EquipmentChannel.water_pump
              const formated = await formatCommand(command)
              socket.write(formated)
            } else {
              command.activation = 0;
              command.onOff = false;
              command.channel = EquipmentChannel.water_pump
              const formated = await formatCommand(command)
              socket.write(formated)
            }

            if (confManual.sombrite){
              command.activation = 5;
              command.onOff = true;
              command.channel = EquipmentChannel.sombrite
              const formated = await formatCommand(command)
              socket.write(formated)
            } else {
              command.activation = 5;
              command.onOff = false;
              command.channel = EquipmentChannel.sombrite
              const formated = await formatCommand(command)
              socket.write(formated)
            }

          } else {

            const now = new Date()
            const dateOpenSombrite: string[] | undefined = confAuto?.open_sombrite.split(':')
            const openDate = new Date()
            const dateCloseSombrite: string[] | undefined = confAuto?.open_sombrite.split(':')
            const closeDate = new Date()

            openDate.setHours(Number(dateOpenSombrite && dateOpenSombrite[0]))
            openDate.setMinutes(Number(dateOpenSombrite && dateOpenSombrite[1]))
            closeDate.setHours(Number(dateCloseSombrite && dateCloseSombrite[0]))
            closeDate.setMinutes(Number(dateCloseSombrite && dateCloseSombrite[1]))

            if(isBefore(closeDate, now) && isAfter(openDate, now)){
              command.activation = 0;
              command.onOff = true;
              command.channel = EquipmentChannel.sombrite
              const formated = await formatCommand(command)
              socket.write(formated)
            }

            if(isAfter(now, closeDate)) {
              command.activation = 0;
              command.onOff = false;
              command.channel = EquipmentChannel.sombrite
              const formated = await formatCommand(command)
              socket.write(formated)
            }

            if(confAuto?.min_temperature && data.temperature < confAuto?.min_temperature) {
              command.activation = 0;
              command.onOff = true;
              command.channel = EquipmentChannel.heater
              const formated = await formatCommand(command)
              socket.write(formated)
            }

            if(confAuto?.max_temperature && data.temperature > confAuto?.max_temperature) {
              command.activation = 0;
              command.onOff = true;
              command.channel = EquipmentChannel.fan
              const formated = await formatCommand(command)
              socket.write(formated)
            }

            if(confAuto?.min_temperature &&
                confAuto?.max_temperature &&
                data.temperature > confAuto?.min_temperature &&
                data.temperature < confAuto?.max_temperature
              ) {
              command.activation = 0;
              command.onOff = false;
              command.channel = EquipmentChannel.fan
              let formated = await formatCommand(command)
              socket.write(formated)

              command.activation = 0;
              command.onOff = false;
              command.channel = EquipmentChannel.heater
              formated = await formatCommand(command)
              socket.write(formated)
            }

            if(confAuto?.min_humidity && data.humidity < confAuto?.min_humidity) {
              command.activation = confAuto.activation_time;
              command.onOff = true;
              command.channel = EquipmentChannel.water_pump
              const formated = await formatCommand(command)
              socket.write(formated)
            }

            if(confAuto?.max_humidity && data.humidity > confAuto?.max_humidity) {
              command.activation = confAuto.activation_time;
              command.onOff = true;
              command.channel = EquipmentChannel.water_pump
              const formated = await formatCommand(command)
              socket.write(formated)
            }

            if(confAuto?.min_humidity &&
                confAuto?.max_humidity &&
                data.humidity > confAuto?.min_humidity &&
                data.humidity < confAuto?.max_humidity
              ) {
              const formated = await formatCommand(command)

              command.activation = confAuto.activation_time;
              command.onOff = false;
              command.channel = EquipmentChannel.water_pump
              socket.write(formated)
            }
          }
      }
    });

    socket.on('end', function() {
        console.log('Closing connection with the client');
    });

    socket.on('error', function(err) {
        console.log(`Error: ${err}`);
    });
});
