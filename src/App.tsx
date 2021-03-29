import {onMounted, ref, resolveComponent} from "vue";
import { Button } from "ant-design-vue";
// import 'ant-design-vue/lib/button/style/index.css'
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
          <Button loading>aabc</Button>
        </div>
      );
    }
  }
}
