export default interface ICreateEquipmentDataDTO {
  equipment_id: number;
  fan: boolean;
  water_flow: number;
  sombrite: boolean;
  heater: boolean;
  water_pump: boolean;
  humidity: number;
  soil_humidity: number;
  temperature: number;
  uv: number;
}
