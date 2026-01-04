import Dialog from "./Dialog";
import Button from "./Button";

export default function ConfirmDialog({
  isOpen,
  onClose,
  onPrimary,
  onSecondary,
  title = "Confirm Action",
  msg = "Are you sure you want to proceed with this action?",
  primaryActionLabel = "Confirm",
  secondaryActionLabel = "Cancel",
  primaryVariant = "primary",
  secondaryVariant = "secondary",
}) {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      closeOnOutsideClick={false}
      isDismissible={false}
      role="alertdialog"
      size="sm"
    >
      <div className="dialog-content">
        <p>{msg}</p>

        <div className="button-dock">
          <Button variant={secondaryVariant} isBlock onClick={onSecondary}>
            {secondaryActionLabel}
          </Button>
          <Button variant={primaryVariant} isBlock onClick={onPrimary}>
            {primaryActionLabel}
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
