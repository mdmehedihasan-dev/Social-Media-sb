import { Swiper, SwiperSlide } from "swiper/react";
import { StoriesData } from "./stories";

const Stories = () => {
  return (
    <>
      <div className="mb-5">
        <h4 className="text-lg text-black font-gilroyBold">Stories</h4>
      </div>

      <div className="w-[332px]">
        <Swiper spaceBetween={5} slidesPerView={3}>
          {StoriesData.map((data, index) => (
            <SwiperSlide
              key={index}
              style={{  background: `url(${data.bgPicture})`, height:"200px" }}
              className="bg-center bg-no-repeat bg-cover rounded-md "
            >
              <div className="object-cover w-10 h-10 mt-2 ml-2 overflow-hidden border-2 rounded-full border-primary_bg">
                <img src={data.picture} alt="" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* <div className="flex items-center gap-x-2 ">
        {StoriesData.slice(0,3).map((data,index)=>(
            <div key={index}
             style={{background:`url(${data.bgPicture})`}}
             className="w-1/3 h-48 bg-center bg-no-repeat bg-cover rounded-md"
            >
                <div  className="object-cover w-10 h-10 mt-2 ml-2 overflow-hidden border-2 rounded-full border-primary_bg">
                    <img src={data.picture} alt="" />
                </div>
            </div>
        ))}
    </div> */}
    </>
  );
};

export default Stories;
