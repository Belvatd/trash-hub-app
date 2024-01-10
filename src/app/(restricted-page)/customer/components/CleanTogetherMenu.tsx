import Image from "next/image"

const CleanTogetherMenu = () => {
  return (
    <>
      <div className="mx-auto flex w-16 flex-col items-center">
        <button>
          <Image
            src={"/assets/icons/clean-together-menu.svg"}
            alt="pickup-icon"
            width={44}
            height={44}
          />
        </button>

        <p className="mt-1 text-center text-xs font-medium">Bersih Bersama</p>
      </div>
    </>
  )
}

export default CleanTogetherMenu
