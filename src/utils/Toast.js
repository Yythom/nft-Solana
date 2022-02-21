import { Icon, Loading, Toast } from "zarm";
import { Notification, Spin } from "@douyinfe/semi-ui";

class showToast {
    static message(msg = ' ', type = 'none', date = 2000, mask) {
        Toast.hide();
        switch (type) {
            case 'none':
                Toast.show({
                    content: msg,
                    mask,
                    stayTime: date
                });
                break;
            case 'success':
                Toast.show({
                    content: <div className="Toastbox">
                        <Icon className="box-icon" type="right" />
                        <div className="box-text">{msg}</div>
                    </div>,
                    mask,
                    stayTime: date
                });
                break;
            case 'error':
                Toast.show({
                    content: <div className="Toastbox">
                        <Icon className="box-icon" type="wrong" />
                        <div className="box-text">{msg}</div>
                    </div>,
                    mask,
                    stayTime: date
                });
                break;
            default:
                break;
        }
    }
}

function showLoading(msg = '', stayTime = 60000) {
    Loading.hide();
    setTimeout(() => {
        Loading.show({
            mask: true,
            content: <div className='loadingBox'>
                <Spin size="large" />
                <div className="box-text">{msg}</div>
            </div>,
            stayTime: stayTime,
        });
    }, 10);
    // size="lg"
}

function hideLoading() {
    Loading.hide();
}
function hideToast() {
    Toast.hide();
}

function showNotic(type = 'success', opt) {
    hideLoading()
    if (!opt.title) {
        if (type === 'error') {
            opt.title = 'fail'
        } else if (type === 'success') opt.title = 'success'
        else opt.title = 'info'
    }

    Notification[type](opt)
}
export {
    showToast,
    showLoading,
    hideLoading,
    hideToast,
    showNotic,
}