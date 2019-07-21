import axios from 'axios';
import Provider from './common/Provider';
import store from '../../store';

const publisherURL = 'http://0.0.0.0:4000';

export default new Provider({
  id: 'clugo',
  name: 'Clugo',
  getLocationUrl({ path }) {
    return `${publisherURL}/repo/${path}`;
  },
  getToken(loc) {
    console.log(loc);
    return 'token'; // we dont care about this token, its just for compatibility
  },
  async uploadContent(token, content, syncLocation) {
    const filename = store.state.file.itemsById[content.id.split('/')[0]].name;
    const payload = {
      filename,
      context: content.text,
    };
    const resp = await axios.post('/api/v1/save_file', payload);
    console.log(resp);
    console.log('Got the content here ', token, syncLocation);
  },
});
