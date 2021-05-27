import Net from 'net'
import ConfigurationsAutomatic from '@modules/configurations/infra/http/controllers/ConfigurationsAutomatic'
import ConfigurationsManual from '@modules/configurations/infra/http/controllers/ConfigurationsManual'
import EquipmentsController from '@modules/equipments/infra/http/controllers/EquipmentsController'
import { formatCommand, IEquipmentCommand, splitData } from '@modules/equipments/utils/utils';

const port = 7090;
const server = new Net.Server();
const configurationsAutomatic = new ConfigurationsAutomatic()
const configurationsManual = new ConfigurationsManual()
const equipmentsController = new EquipmentsController()

interface IDate {
  hour: string | undefined
  minute: string | undefined
}

server.listen(port, function() {
    console.log(`Server listening for connection requests on socket localhost:${port}`);
});

server.on('connection', function(socket) {
    console.log('A new connection has been established.');

    socket.on('data', async function(chunk) {
        const confAuto = await configurationsAutomatic.findLocal()
        const confManual = await configurationsManual.findLocal()
        const command = {} as IEquipmentCommand

        const data = splitData(chunk.toString());
        await equipmentsController.create(data)

        console.log(`Data received from client: ${chunk.toString()}`);

        setTimeout(() => {
          if (confManual?.active) {

            if (confManual.fan){
              command.activation = 0;
              command.onOff = true;
              command.channel = 0
              const formated = formatCommand(command)
              socket.write(formated)
            } else {
              command.activation = 0;
              command.onOff = false;
              command.channel = 0
              const formated = formatCommand(command)
              socket.write(formated)
            }

            if (confManual.humidity){
              command.activation = 0;
              command.onOff = true;
              command.channel = 1
              const formated = formatCommand(command)
              socket.write(formated)
            } else {
              command.activation = 0;
              command.onOff = false;
              command.channel = 1
              const formated = formatCommand(command)
              socket.write(formated)
            }

            if (confManual.temperature){
              command.activation = 0;
              command.onOff = true;
              command.channel = 2
              const formated = formatCommand(command)
              socket.write(formated)
            } else {
              command.activation = 0;
              command.onOff = false;
              command.channel = 2
              const formated = formatCommand(command)
              socket.write(formated)
            }

            if (confManual.sombrite){
              command.activation = 5;
              command.onOff = true;
              command.channel = 3
              const formated = formatCommand(command)
              socket.write(formated)
            } else {
              command.activation = 5;
              command.onOff = false;
              command.channel = 3
              const formated = formatCommand(command)
              socket.write(formated)
            }

          } else {

            let [hour, minute]: IDate = confAuto?.open_sombrite.split(':')
            const open = new Date()
            open.setHours(Number(hour))
            open.setMinutes(Number(minute))

            if(confAuto?.min_temperature && data.temperature < confAuto?.min_temperature) {
              command.activation = 0;
              command.onOff = true;
              command.channel = 2
              const formated = formatCommand(command)
              socket.write(formated)
            }

            if(confAuto?.max_temperature && data.temperature > confAuto?.max_temperature) {
              command.activation = 0;
              command.onOff = true;
              command.channel = 0
              const formated = formatCommand(command)
              socket.write(formated)
            }

            if(confAuto?.min_temperature &&
                confAuto?.max_temperature &&
                data.temperature > confAuto?.min_temperature &&
                data.temperature < confAuto?.max_temperature
              ) {
              command.activation = 0;
              command.onOff = false;
              command.channel = 0
              let formated = formatCommand(command)
              socket.write(formated)

              command.activation = 0;
              command.onOff = false;
              command.channel = 0
              formated = formatCommand(command)
              socket.write(formated)
            }

          }
          const msg = `${String.fromCharCode(62)}CD,0,1,10${String.fromCharCode(60)}`
          socket.write(msg)
          console.log(msg)
        }, 5000, 'Delay');

    });

    socket.on('end', function() {
        console.log('Closing connection with the client');
    });

    socket.on('error', function(err) {
        console.log(`Error: ${err}`);
    });
});
