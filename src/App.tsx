import {onMounted, ref} from "vue";
import { Button } from "ant-design-vue";
export default {
  name: 'App',
  setup() {
    return () => {
      return (
        <div id="root">
          App root:
          <ul>
            <li>aa</li>
            <li>bb</li>
          </ul>
          button:
          <Button loading>aabc</Button>
        </div>
      );
    }
  }
}
