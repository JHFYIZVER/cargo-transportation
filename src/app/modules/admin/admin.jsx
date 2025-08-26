import React from "react";
import { getAllVehicles } from "./model/get-all-vehicles";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/shared/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/shared/ui/card";
import VehicleList from "./vehicle-list";
import UpdateForm from "./update-form";
import CreateForm from "./create-form";
import DeleteForm from "./delete-form";
import OrderList from "./order-list";
import { getAllOrders } from "./model/get-all-orders";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const Admin = async () => {
  const [orders, vehicles] = await Promise.all([
    getAllOrders(),
    getAllVehicles(),
  ]);

  return (
    <section>
      <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mb-4 uppercase text-white">
        Админ панель
      </h1>
      <Card className="w-full bg-[#282A2D] border-none text-white">
        <CardHeader>
          <CardTitle className="text-lg md:text-2xl font-bold">
            Выберите пункт
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue="list"
            className="flex gap-6 lg:flex-row justify-between"
          >
            <TabsList className="flex flex-col h-auto max-h-59 max-w-64 w-full space-y-2">
              <TabsTrigger
                value="list"
                className="w-full justify-start py-3 px-4 cursor-pointer mb-0"
              >
                Список транспорта
              </TabsTrigger>
              <TabsTrigger
                value="create"
                className="w-full justify-start py-3 px-4 cursor-pointer mb-0"
              >
                Создать транспорт
              </TabsTrigger>
              <TabsTrigger
                value="update"
                className="w-full justify-start py-3 px-4 cursor-pointer mb-0"
              >
                Обновить транспорт
              </TabsTrigger>
              <TabsTrigger
                value="delete"
                className="w-full justify-start py-3 px-4 cursor-pointer mb-0"
              >
                Удалить транспорт
              </TabsTrigger>
              <TabsTrigger
                value="order"
                className="w-full justify-start py-3 px-4 cursor-pointer mb-0"
              >
                Просмотр заказов
              </TabsTrigger>
            </TabsList>

            <div className="w-full">
              <TabsContent value="list" className="mt-0">
                <VehicleList vehicles={vehicles} />
              </TabsContent>

              <TabsContent value="create" className="mt-0">
                <CreateForm />
              </TabsContent>

              <TabsContent value="update" className="mt-0">
                <UpdateForm vehicles={vehicles} />
              </TabsContent>

              <TabsContent value="delete" className="mt-0">
                <DeleteForm vehicles={vehicles} />
              </TabsContent>

              <TabsContent value="order" className="mt-0">
                <OrderList orders={orders} />
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </section>
  );
};

export default Admin;
