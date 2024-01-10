import Image from "next/image"

const RoutinePickupMenu = () => {
  return (
    <>
      <div className="mx-auto flex w-16 flex-col items-center">
        <button>
          <Image
            src={"/assets/icons/routine-pickup-menu.svg"}
            alt="pickup-icon"
            width={44}
            height={44}
          />
        </button>

        <p className="mt-1 text-center text-xs font-medium">Pick-Up Rutin</p>
      </div>
    </>
  )
}

export default RoutinePickupMenu
