// /*

// 当前存在的问题:
//   - 使用缓存共享全局数据
//   - 频繁同步读写缓存

// 解决思路:
//   - 重写wx 缓存同步读写接口
//   - 一次性读取所有缓存至内存
//   - 后续读取直接从缓存中获取
//   - 后续存储直接更新至缓存，同时异步进行存储更新

// */

// let cacheData;

// const wxGetStorageSync = wx.getStorageSync;
// const wxSetStorage = wx.setStorage;

// // 同步读取所有缓存至内存，只需读取一次
// const readAllStorageSync = () => {
// 	const data = {};
// 	const { keys } = wx.getStorageInfoSync();

// 	keys.forEach((key) => {
// 		const value = wxGetStorageSync(key);
// 		data[key] = value;
// 	});

// 	return data;
// };

// // 异步保存
// const setStorage = ({ key, data, success, fail }) => {
// 	// if(key==='shopitem') debugger;

// 	if (!cacheData) {
// 		cacheData = readAllStorageSync();
// 	}

// 	cacheData[key] = data;

// 	wxSetStorage({
// 		key,
// 		data,
// 		success: success || function () {},
// 		fail: fail || function () {},
// 	});
// };

// // 从内存读取
// const getStorageSync = (key) => {
// 	if (!cacheData) {
// 		cacheData = readAllStorageSync();
// 	}

// 	// console.log('cacheData<', key,typeof cacheData[key] )

// 	// return cacheData[key] === undefined ? "" : cacheData[key];
// };

// // 保存至内存
// const setStorageSync = (key, val) => {
// 	// if(key==='shopitem') debugger;

// 	if (!cacheData) {
// 		cacheData = readAllStorageSync();
// 	}

// 	cacheData[key] = val;

// 	// console.log('cacheData>', key, val, cacheData)

// 	wxSetStorage({
// 		key,
// 		data: val,
// 	});
// };

// const rewriteWxStorage = () => {
// 	wx.getStorageSync = getStorageSync;
// 	wx.setStorageSync = setStorageSync;
// 	wx.setStorage = setStorage;
// };

// rewriteWxStorage();

// module.exports = {
// 	rewriteWxStorage,
// };
