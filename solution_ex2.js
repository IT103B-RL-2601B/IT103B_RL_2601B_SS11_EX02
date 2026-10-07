let count = 1;

const validateDevice = (dev) => {
  return (
    dev &&
    dev.name &&
    dev.room &&
    typeof dev.powerWatts === "number" &&
    dev.powerWatts > 0
  );
};

const createDevice = (list, newDev) => {
  if (!validateDevice(newDev)) return null;

  const device = {
    id: `DEV_${String(count++).padStart(3, "0")}`,
    name: newDev.name,
    room: newDev.room,
    powerWatts: newDev.powerWatts,
    isActive: newDev.isActive !== undefined ? newDev.isActive : true,
  };

  list.push(device);
  return device;
};

const readDevicesByRoom = (list, roomName) => {
  return list.filter(
    (dev) => dev.room.toLowerCase() === roomName.toLowerCase(),
  );
};

const updateDevice = (list, id, updateData) => {
  const target = list.find((dev) => dev.id === id);
  if (!target || !updateData) return false;

  if (updateData.name !== undefined) target.name = updateData.name;
  if (updateData.room !== undefined) target.room = updateData.room;
  if (updateData.isActive !== undefined) target.isActive = updateData.isActive;
  if (updateData.powerWatts !== undefined)
    target.powerWatts = updateData.powerWatts;

  return true;
};

const deleteDevice = (list, id) => {
  const index = list.findIndex((dev) => dev.id === id);
  if (index === -1) return false;

  list.splice(index, 1);
  return true;
};

// Kiểm thử
const devices = [];

console.log(
  "create:",
  createDevice(devices, {
    name: "Điều hòa",
    room: "Living Room",
    powerWatts: 1500,
  }),
);
console.log(
  "create:",
  createDevice(devices, { name: "Đèn ngủ", room: "Bedroom", powerWatts: 40 }),
);
console.log(
  "create lỗi:",
  createDevice(devices, { name: "Quạt", room: "Bedroom", powerWatts: 0 }),
);

console.log("read:", readDevicesByRoom(devices, "Bedroom"));

console.log(
  "update DEV_001:",
  updateDevice(devices, "DEV_001", { isActive: false, powerWatts: 0 }),
);
console.log(
  "update không tồn tại:",
  updateDevice(devices, "DEV_999", { isActive: true }),
);

console.log("delete DEV_002:", deleteDevice(devices, "DEV_002"));
console.log("delete không tồn tại:", deleteDevice(devices, "DEV_002"));

console.log("Danh sách cuối:", devices);
