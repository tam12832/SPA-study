import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import OrderButton from './Buttons/OrderButton'

const NewOrderConfirmDialog = ({
  isOpen,
  onClose,
  existingRestaurantName,
  newRestaurantName,
  onClickSubmit
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="xs"
    >
      <DialogTitle>
        新規注文を開始しますか？
      </DialogTitle>
      <DialogContent>
        <p>
          {
            `ご注文に${existingRestaurantName}の商品が含まれています。
            新規の注文を開始して${newRestaurantName}の商品を追加して下さい。`
          }
        </p>  
        <OrderButton onClick={onClickSubmit}>
          新規注文
        </OrderButton>
      </DialogContent>  
    </Dialog>
  )
}

export default NewOrderConfirmDialog