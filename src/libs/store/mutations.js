const mutations = (state, data) => {

  switch (data.type) {
    case 'title':
      return { ...state, title: data.title }
      break

    case 'search':
      return { ...state, search: data.search }
      break
  }
}

export default mutations
