import banner from '../../../images/banner.jpg'
export default function Banner() {
    return(
        <div className="bg-cover bg-no-repeat bg-center py-36" style={{backgroundImage:`url("${banner.src}")`, backgroundPosition: 'top'}}>
  <div className="container">
    <h1 className="text-6xl text-gray-800 font-medium mb-4 capitalize">
      Knowledge <br /> is power
    </h1>
    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam <br />
      accusantium perspiciatis, sapiente
      magni eos dolorum ex quos dolores odio</p>
    <div className="mt-12">
      <a href="#" className="py-4 px-3 btn-style1">Shop Now</a>
    </div>
  </div>
</div>

    )
}