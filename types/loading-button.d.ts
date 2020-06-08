import { ElButton } from './button'

/** LoadingButton Component */
export declare class ElLoadingButton extends ElButton {
  loadingClick: () => Promise<any>
}
