function getLoaingObj() {
  const page = getCurrentPages()
  console.log(page[page.length - 1].selectComponent())
  return page[page.length - 1].selectComponent('#loading')
}

export default {
  get store() {
    const store = getApp().store
    return {
      set: (key, value = '') => {
        if (key) {
          store[key] = value
        }
      },
      get: (key) => {
        return store[key]
      }
    }
  },
  get storage() {
    return {
      set: (key, value = '') => {
        if (key) {
          return wx.setStorageSync(key, value)
        }
      },
      get: (key) => {
        return wx.getStorageSync(key)
      }
    }
  },
  loading(loadingText = '加载中···', mask = true) {
    const loading = getLoaingObj()
    
    if (loading) {
      loading.show(loadingText, mask)
    }
  },
  hideLoading() {
    const loading = getLoaingObj()
    console.log(loading)
    if (loading) {
      loading.hide()
    }
  },
}