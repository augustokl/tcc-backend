export default interface IUpdateAutomaticConfigDTO {
  min_humidity: number;
  max_humidity: number;
  min_temperature: number;
  max_temperature: number;
  activation_time: number;
  open_sombrite: string;
  close_sombrite: string;
}
