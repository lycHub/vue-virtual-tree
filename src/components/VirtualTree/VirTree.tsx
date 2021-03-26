import {defineComponent} from 'vue';
import './index.scss';

export default defineComponent({
  name: 'VirTree',
  props: {

  },
  emits: [],
  setup(props, { emit }) {
    return () => {
      return (
        <div class="virtual-tree">
          virtual-tree
        </div>
      );
    }
  }
});
