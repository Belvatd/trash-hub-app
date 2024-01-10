import Image from "next/image"

const PickupMenu = () => {
  return (
    <>
      <div className="mx-auto flex w-16 flex-col items-center">
        <button>
          <Image
            src={"/assets/icons/pickup-menu.svg"}
            alt="pickup-icon"
            width={44}
            height={44}
          />
        </button>

        <p className="mt-1 text-center text-xs font-medium">Pick-Up</p>
      </div>
    </>
  )
}

export default PickupMenu
