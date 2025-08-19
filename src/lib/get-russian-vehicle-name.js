export function getRussianVehicleName(vehicleType) {
  const names = {
    TRUCK: "Грузовики",
    LIGHT_TRUCK: "Лёгкие грузовики",
    TENT_TRUCK: "Тентованные фуры",
    REFRIGERATOR: "Рефрижераторы",
    TANKER: "Фуры",
  };

  return names[vehicleType] || vehicleType;
}
