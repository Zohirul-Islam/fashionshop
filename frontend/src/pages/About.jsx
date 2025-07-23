import { assets } from "../assets/assets";
import Title from "../components/Title";
import Newsletterbox from '../components/Newsletterbox'

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title txt1={"ABOUT"} txt2={"US"} />
      </div>
      <div className="flex flex-col my-10 md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum,
            temporibus ducimus vel accusamus quia eos distinctio! Dignissimos
            vel animi quia sed repellendus et harum nulla aperiam consequuntur
            labore! Molestiae, quo.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum,
            temporibus ducimus vel accusamus quia eos distinctio! Dignissimos
            vel animi quia sed repellendus et harum nulla aperiam consequuntur
            labore! Molestiae, quo.
          </p>
          <b>Our Mission</b>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit a
            dignissimos quod iste aperiam, nesciunt quibusdam libero iusto
            quaerat, asperiores velit at, eaque nobis quis. Fugiat corporis iure
            quae a.
          </p>
        </div>
      </div>
      <div className="text-xl py-4">
        <Title txt1={"WHY"} txt2={"CHOICE US"} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
            commodi quo laudantium mollitia, molestiae hic iste numquam quasi
            non obcaecati ipsa reprehenderit atque, qui est.
          </p>
        </div>
         <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convinience :</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
            commodi quo laudantium mollitia, molestiae hic iste numquam quasi
            non obcaecati ipsa reprehenderit atque, qui est.
          </p>
        </div>
                <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
            commodi quo laudantium mollitia, molestiae hic iste numquam quasi
            non obcaecati ipsa reprehenderit atque, qui est.
          </p>
        </div>
      </div>
      <Newsletterbox/>
    </div>
  );
};

export default About;
