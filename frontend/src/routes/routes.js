// import CatPage from "../pages/CatPage";
import DogPage from "../pages/DogPage";
import HomePage from "../pages/HomePage";
import DogDetail from "../pages/DogDetail";
import PageWrapper from "../components/PageWrapper";
import ProtectedPage from "../components/ProtectedPage";
import CartPage from "../pages/CartPage";
import Page404 from "../pages/Page404";
import ProductPage from "../pages/ProductPage";
import ProductDetail from "../pages/ProductDetail";
import OrderPage from "../pages/OrderPage";
import CheckoutPage from "../pages/CheckoutPage";
import ProfilePage from "../pages/ProfilePage";
import PurchasedPage from "../pages/PurchasedPage";
import PurchasedDetail from "../sections/purchased/PurchasedDetail";
import VoucherPage from "../pages/VoucherPage";
import ProfilePetPage from "../pages/ProfilePetPage";
import BookingPage from "../pages/BookingPage";
import ContactPage from "../pages/ContactPage";

const routes = [
  {
    index: true,
    element: <HomePage />,
    state: "home"
  },
  {
    path: "/dog",
    element: <DogPage />,
    state: "dog"
  },
  {
    path: "/dog/:id",
    element:
    <PageWrapper>
      <DogDetail />
    </PageWrapper>
  },
  {
    path: "/product",
    element: <ProductPage />,
    state: "product"
  },
  {
    path: "/product/:id",
    element:
    <PageWrapper>
      <ProductDetail />
    </PageWrapper>
  },
  {
    path: "/contact",
    element: <ContactPage />,
    state: "contact"
  },
  {
    path: "/voucher",
    element:
    <PageWrapper>
      <VoucherPage />
    </PageWrapper>
  },
  {
    path: "/cart",
    element:
    <PageWrapper>
      <ProtectedPage>
        <CartPage />
      </ProtectedPage>
    </PageWrapper>
  },
  {
    path: "/order",
    element:
    <PageWrapper>
      <ProtectedPage>
        <OrderPage />
      </ProtectedPage>
    </PageWrapper>
  },
  {
    path: "/checkout/success",
    element:
    <PageWrapper>
      <ProtectedPage>
        <CheckoutPage />
      </ProtectedPage>
    </PageWrapper>
  },
  {
    path: "/profile",
    element:
    <PageWrapper>
      <ProtectedPage>
        <ProfilePage />
      </ProtectedPage>
    </PageWrapper>
  },
  {
    path: "/purchased",
    element: <PageWrapper>
      <ProtectedPage>
        <PurchasedPage />
      </ProtectedPage>
    </PageWrapper>
  },
  {
    path: "/purchased/:id",
    element: <PageWrapper>
      <ProtectedPage>
        <PurchasedDetail />
      </ProtectedPage>
    </PageWrapper>
  },
  {
    path: "/booking",
    element: <PageWrapper>
      <ProtectedPage>
        <BookingPage />
      </ProtectedPage>
    </PageWrapper>
  },
  {
    path: "/profile-pet",
    element: <PageWrapper>
      <ProtectedPage>
        <ProfilePetPage />
      </ProtectedPage>
    </PageWrapper>
  },
  {
    path: "/404",
    element: <Page404 />
  }
];

export default routes;