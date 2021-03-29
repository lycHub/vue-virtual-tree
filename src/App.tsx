import {onMounted, ref, resolveComponent} from "vue";
// import { Button } from "ant-design-vue";
export default {
  name: 'App',
  setup() {
    // const AButton = resolveComponent('AButton')
    return () => {
      return (
        <div id="root">
          App root:
          <ul>
            <li>aa</li>
            <li>bb</li>
          </ul>
          button:
          <a-button>aabc</a-button>
        </div>
      );
    }
  }
}
