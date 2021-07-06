import $ from "jquery";
import BaseComponent from "../../Core/Component/BaseComponent";
import DashboardMiddleware from "../../Middleware/DashboardMiddleware";
import DashboardUserCreate from "./DashboardUserCreate";

export default class DashboardUserAdd extends BaseComponent {
    constructor(elem) {
        super(elem);
        this.formCtrlBlockElem = this.elem.find('.form-control-block');
        this.addBtn = this.formCtrlBlockElem.find('.add-btn');
        this.addListeners();
    }

    addListeners() {
        if (!this.elem) {
            return;
        }
        this.addBtn.click(this.onWidgetClick.bind(this));
    }

    onWidgetClick(evt) {
        if (evt) {
            evt.preventDefault();
        }
        this.sendUserAdd();
    }

    sendUserAdd() {
        DashboardMiddleware.addUser(            
            this.handleUserCreateSuccess.bind(this)
        );
    }

    handleUserCreateSuccess(userAddElem) {
        this.replaceWithAddWidget($(userAddElem));
    }

    replaceWithAddWidget(userAddElem) {
        this.elem.replaceWith(userAddElem);
        new DashboardUserEdit(userAddElem);
    }
}
