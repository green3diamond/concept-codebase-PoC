import { Pencil } from "'lucide-react'"
import { Button } from "@/components/new_stable/ui/button"

/**
* Renders a circular button with an edit icon.
* This button is designed to be used as a floating action button for editing purposes.
*
* @param {Object} props - The component props.
* @param {Function} props.onClick - The function to be called when the button is clicked.
* @returns {JSX.Element} A Button component styled as a circular edit button.
*/
export default function BadgeButton({ onClick }) {
    return (
      <Button
  
        variant="secondary"
        size="icon"
        className="w-8 h-8 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors duration-200"
        onClick={onClick}
      >
        <Pencil className="h-4 w-4 text-gray-600" />
        <span className="sr-only">Edit</span>
      </Button>
    )
  }