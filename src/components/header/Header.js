import { ExcelComponent } from "../../core/ExcelComponent";
import { $ } from "../../core/Dom";
import { changeTableName } from "../../redux/actions";
import { debounce } from "../../core/utils";

export class Header extends ExcelComponent {
  static className = "excel__header";

  constructor($root, options) {
    super($root, {
      name: "Header",
      listeners: ["input"],
      ...options,
    });
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300);
  }

  onInput(event) {
    const value = $(event.target).text();
    this.$dispatch(changeTableName({ value }));
  }

  toHtml() {
    const title = this.store.getState().currentTableName;
    return `<input type="text" class="input" value="${title}" />
    <div>
      <div class="button">
        <i class="material-icons">delete</i>
      </div>
      <div class="button">
        <i class="material-icons">exit_to_app</i>
      </div>
    </div>`;
  }
}
