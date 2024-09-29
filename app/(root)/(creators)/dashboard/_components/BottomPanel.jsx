import Link from "next/link";
import RecentOrders from "./OrdersPanel"
import Achievements from "./Acheivements"


function BottomPanel() {

    const sampleOrders = [
        { product: 'T-shirt', username: 'john_doe', status: 'Shipped' },
        { product: 'Mug', username: 'jane_smith', status: 'Pending' },
        { product: 'Sticker Pack', username: 'user123', status: 'Cancelled' },
      ];

      const acheivements = [
        {category: "Best Selling product", rank: "2", product: "Sturdy Hoodie"},
        {category: "Trending Creators", rank: "5"}
      ]

  return (
    <div className="flex gap-4 md:flex-row flex-col">
        <Achievements acheivements={acheivements}/>
        <RecentOrders  orders={sampleOrders}/>
    </div>
  )
}

export default BottomPanel