import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

// layouts
import Admin from "layouts/Admin.js";
import Admin1 from "layouts/Admin1.js";
import Auth from "layouts/Auth.js";
import Services from "views/admin/Services.js";
import Testing from "views/admin/Testing.js";
import Sbooking from "views/admin/SBooking.js";
import Essential from "views/admin/Essential.js";

// views without layouts
import Landing from "views/Landing.js";
import Profile from "views/Profile.js";
import Index from "views/Index.js";
import Service1 from "components/Cards/Service1.js";
import Donation from "components/Cards/Donation.js";
import StayBook from "components/Cards/StayBookingCard.js";
import Est from "components/Cards/EsT.js";
import Virt from "components/Cards/Virtual.js";
import Virtual from "views/admin/Vdarshan.js";

// Import Translation Context
import { TranslationProvider } from "views/admin/TranslationContext.js";

ReactDOM.render(
  <TranslationProvider> {/* Wrap everything inside TranslationProvider */}
    <BrowserRouter>
      <Switch>
        {/* Routes with layouts */}
        <Route path="/admin" component={Admin} />
        <Route path="/admin1" component={Admin1} />
        <Route path="/auth" component={Auth} />

        {/* Routes without layouts */}
        <Route path="/landing" exact component={Landing} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/services" exact component={Services} />
        <Route path="/testing" exact component={Testing} />
        <Route path="/service1" exact component={Service1} />
        <Route path="/donation" exact component={Donation} />
        <Route path="/booking" exact component={Sbooking} />
        <Route path="/staybook" exact component={StayBook} />
        <Route path="/es" exact component={Est} />
        <Route path="/essential" exact component={Essential} />
        <Route path="/virt" exact component={Virtual} />
        <Route path="/virtual" exact component={Virtual} />
        <Route path="/" exact component={Index} />

        {/* Redirect all unknown routes to home */}
        <Redirect from="*" to="/" />
      </Switch>
    </BrowserRouter>
  </TranslationProvider>,
  document.getElementById("root")
);
