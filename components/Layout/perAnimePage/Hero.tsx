const Hero = ({ coverImage, title, description }) => {
  return (
    <div className=" border-white border-8 grid grid-cols-[200px_auto] p-3 place-items-center gap-3 mx-auto">
      <img className=" p-2" src={coverImage} alt="coverImage" />
      <div className="">
        <p className="text-2xl">{title}</p>
        <br />
        <div
          className="text-sm"
          dangerouslySetInnerHTML={{ __html: description }}
        ></div>
      </div>
    </div>
  )
}

export default Hero
