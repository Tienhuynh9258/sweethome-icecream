import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Filter, Package, Calendar, Clock } from "lucide-react";
import { Database } from "@/integrations/supabase/types";
import Navbar from "@/components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Order = Database["public"]["Tables"]["orders"]["Row"] & {
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    image_url: string;
  }>;
};

type OrderStatus = Order["order_status"];

const ORDER_STATUSES: { value: OrderStatus; label: string; }[] = [
  { value: "pending", label: "Pending" },
  { value: "processing", label: "Processing" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

const OrderStatusBadge = ({ status }: { status: Order["order_status"] }) => {
  const getStatusColor = (status: Order["order_status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "processing":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <span 
      className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(status)} 
        flex items-center w-fit gap-1.5`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${status === 'pending' ? 'bg-yellow-500' : 
        status === 'processing' ? 'bg-blue-500' : 
        status === 'completed' ? 'bg-green-500' : 
        'bg-red-500'}`} 
      />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const OrderHistory = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | "all">("all");
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        navigate("/auth");
        return;
      }

      try {
        let query = supabase
          .from("orders")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (selectedStatus !== "all") {
          query = query.eq("order_status", selectedStatus);
        }

        const { data: ordersData, error: ordersError } = await query;

        if (ordersError) throw ordersError;

        const ordersWithItems = await Promise.all(
          (ordersData || []).map(async (order) => {
            const { data: itemsData, error: itemsError } = await supabase
              .from("order_items")
              .select(`
                quantity,
                price,
                total,
                flavors (
                  name,
                  image_url
                )
              `)
              .eq("order_id", order.id);

            if (itemsError) throw itemsError;

            return {
              ...order,
              items: (itemsData || []).map((item) => ({
                name: item.flavors?.name || "Unknown Flavor",
                quantity: item.quantity,
                price: item.price,
                image_url: item.flavors?.image_url || ""
              }))
            };
          })
        );

        setOrders(ordersWithItems);
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch order history. Please try again later.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate, toast, selectedStatus]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <Package className="h-8 w-8 text-orange-500" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
              Order History
            </h1>
          </div>

          <div className="flex items-center gap-3 bg-white p-2 rounded-lg shadow-sm">
            <Filter className="h-5 w-5 text-orange-500" />
            <Select
              value={selectedStatus}
              onValueChange={(value) => setSelectedStatus(value as OrderStatus | "all")}
            >
              <SelectTrigger className="w-[180px] border-none focus:ring-1 focus:ring-orange-500">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Orders</SelectItem>
                {ORDER_STATUSES.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
          </div>
        ) : orders.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 bg-white rounded-2xl shadow-lg shadow-orange-100/50"
          >
            <Package className="h-16 w-16 mx-auto mb-4 text-orange-200" />
            <p className="text-gray-500 mb-4">No orders found.</p>
            <Button
              onClick={() => navigate("/menu")}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              Browse our menu
            </Button>
          </motion.div>
        ) : (
          <div className="space-y-6">
            <AnimatePresence mode="popLayout">
              {orders.map((order) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="group"
                >
                  <Card className="overflow-hidden border-orange-100 hover:border-orange-200 transition-all duration-200 shadow-lg shadow-orange-100/20 hover:shadow-orange-100/40">
                    <CardHeader className="bg-gradient-to-r from-orange-50/50 to-white border-b border-orange-100">
                      <CardTitle className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                          <span className="text-lg font-bold text-orange-600">
                            Order #{order.id.slice(0, 8)}
                          </span>
                          <OrderStatusBadge status={order.order_status} />
                        </div>
                        <div className="flex items-center gap-6 text-sm text-gray-500">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(order.created_at || "").toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>{new Date(order.created_at || "").toLocaleTimeString()}</span>
                          </div>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-6">
                        <div className="grid gap-4">
                          {order.items.map((item, index) => (
                            <div 
                              key={index} 
                              className="flex justify-between items-center p-3 rounded-lg bg-orange-50/50 group-hover:bg-orange-50 transition-colors duration-200"
                            >
                              <div className="flex items-center gap-4">
                                {item.image_url ? (
                                  <img
                                    src={item.image_url}
                                    alt={item.name}
                                    className="w-16 h-16 object-cover rounded-lg shadow-md"
                                  />
                                ) : (
                                  <div className="bg-white p-2 rounded-md w-16 h-16 flex items-center justify-center">
                                    <Package className="h-8 w-8 text-orange-500" />
                                  </div>
                                )}
                                <div>
                                  <p className="font-medium text-gray-800">{item.name}</p>
                                  <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                                  <p className="text-sm font-medium text-orange-600 mt-1">
                                    {item.price.toLocaleString()}đ x {item.quantity}
                                  </p>
                                </div>
                              </div>
                              <span className="font-medium text-orange-600 text-lg">
                                {(item.price * item.quantity).toLocaleString()}đ
                              </span>
                            </div>
                          ))}
                        </div>
                        
                        <div className="space-y-3 pt-4 border-t border-orange-100">
                          <div className="flex justify-between text-gray-600">
                            <span>Subtotal</span>
                            <span>{order.subtotal.toLocaleString()}đ</span>
                          </div>
                          <div className="flex justify-between text-gray-600">
                            <span>Shipping Fee</span>
                            <span>{order.shipping_fee.toLocaleString()}đ</span>
                          </div>
                          <div className="flex justify-between text-lg font-bold text-orange-600 pt-2 border-t border-orange-100">
                            <span>Total</span>
                            <span>{order.total.toLocaleString()}đ</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory; 