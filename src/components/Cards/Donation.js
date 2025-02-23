import k1 from "assets/img/vithal1.jpg";
import k2 from "assets/img/pundalik.jpg";
import k3 from "assets/img/namdev_payari.jpg";

export default function ImageTextBlock() {
    return (
      <div className="flex flex-col w-full p-4 space-y-6">
        {/* First Block */}
        <div className="flex w-full">
          <div className="w-2/3 h-64 bg-gray-300 flex items-center justify-center">
            <img 
              src={k1} 
              alt="Vithal Temple" 
              className="object-cover rounded-lg" 
              style={{width:'800px',height:'450px'}}
            />
          </div>
          <div className="w-1/3 h-64 bg-white p-6 flex flex-col justify-center shadow-lg rounded-lg" style={{marginLeft:'20px',width:'600px'}}>
            <h2 className="text-xl font-bold text-gray-800" style={{marginLeft:'20px'}}>Donate to the Vithal Temple</h2>
            <p className="text-gray-700 text-base font-medium mt-2" style={{margin:'20px'}}>
              Mukh Darshan allows devotees to have a sacred and peaceful view of Lord Vithoba’s 
              divine face. Donations for Mukh Darshan go towards maintaining the temple premises, 
              ensuring cleanliness, and providing a smooth darshan experience.
            </p>
            <p className="text-gray-700 text-base font-medium mt-4" style={{marginLeft:'20px'}}>
              <strong>Donation Contact:</strong><br/>
              <strong>Person in Charge:</strong> Shri. Mahadev Joshi (Temple Trustee)<br/>
              <strong>Phone:</strong> +91 98765 43210<br/>
              <strong>UPI ID:</strong> vithaltemple@upi
            </p>
          </div>
        </div>
        
        {/* Second Block */}
        <div className="flex w-full mt-20">
          <div className="w-2/3 h-64 bg-gray-300 flex items-center justify-center">
            <img 
              src={k2} 
              alt="Pundalik Temple" 
              className="object-cover rounded-lg" 
              style={{width:'800px',height:'450px'}}
            />
          </div>
          <div className="w-1/3 h-64 bg-white p-6 flex flex-col justify-center shadow-lg rounded-lg" style={{marginLeft:'20px',width:'600px'}}>
            <h2 className="text-xl font-bold text-gray-800" style={{marginLeft:'20px'}}>Donate to the Pundalik Temple</h2>
            <p className="text-gray-700 text-base font-medium mt-2" style={{margin:'20px'}}>
              Pundalik Mandir is dedicated to the great devotee Sant Pundalik.
              Contributions help in temple maintenance, religious ceremonies, 
              and supporting devotees visiting for spiritual peace.
            </p>
            <p className="text-gray-700 text-base font-medium mt-4" style={{marginLeft:'20px'}}>
              <strong>Donation Contact:</strong><br/>
              <strong>Person in Charge:</strong> Shri. Suresh Patil (Head Priest) <br/>
              <strong>Phone:</strong> +91 76543 21098<br/>
              <strong>UPI ID:</strong> pundalikmandir@upi
            </p>
          </div>
        </div>
        
        {/* Third Block */}
        <div className="flex w-full mt-20">
          <div className="w-2/3 h-64 bg-gray-300 flex items-center justify-center">
            <img 
              src={k3} 
              alt="Another Temple" 
              className="object-cover rounded-lg" 
              style={{width:'800px',height:'450px'}}
            />
          </div>
          <div className="w-1/3 h-64 bg-white p-6 flex flex-col justify-center shadow-lg rounded-lg" style={{marginLeft:'20px',width:'600px'}}>
            <h2 className="text-xl font-bold text-gray-800" style={{marginLeft:'20px'}}>Donate to Namdev Payari</h2>
            <p className="text-gray-700 text-base font-medium mt-2" style={{margin:'20px'}}>
            Namdev Payri is a sacred staircase where Sant Namdev devotedly sang praises of Lord Vithoba. 
            This historic place requires continuous preservation efforts.
             Your donation helps in its maintenance and restoration.
            </p>
            <p className="text-gray-700 text-base font-medium mt-4" style={{marginLeft:'20px'}}>
              <strong>Donation Contact:</strong><br/>
              <strong>Person in Charge:</strong>Shri. Ramesh Kulkarni (Temple Manager)
              <br/>
              <strong>Phone:</strong> +91 87654 32109<br/>
              <strong>UPI ID:</strong>namdevpayri@upi
            </p>
          </div>
        </div>
      </div>
    );
}
