import store from '../store';


export default {
    namespaced: true,
    state: {
        // Data items stored in the DB
        itemsById: {},
        // Data items stored in the localStorage
        lsItemsById: {},
  },
}