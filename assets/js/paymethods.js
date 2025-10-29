let initialSum = $(".payment .sum.active").data("sum");
$(".client-amount").val(initialSum);

// Переключение кнопок суммы
$(".payment .sum").click(function () {
  $(this).parent().find(".sum").removeClass("active");
  $(this).parent().find(".input-sum").removeClass("active");
  $(this).addClass("active");
  $(this).parent().find(".client-amount").val($(this).data("sum"));
  let dataSum = $(this).data("sum");
  $(this).parent().parent().find(".label").removeClass("active");
  $(this)
    .parent()
    .parent()
    .find('.label[data-sum="' + dataSum + '"')
    .addClass("active");
});

// Валидация поля суммы + неактивная кнопка суммы
$(document).on("change keyup input click", ".input-sum", function () {
  $(this).parent().find(".sum").removeClass("active");

  if (this.value.match(/[^0-9]/g)) {
    this.value = this.value.replace(/[^0-9]/g, "");
  }
  if ($(this).val() != "") {
    $(this).addClass("active");
    $(this).parent().find(".client-amount").val($(this).val());
  } else {
    if ($(this).parent().find('.sum[data-sum="1170"]').length) {
      $(this).parent().find('.sum[data-sum="1170"]').addClass("active");
      $(this).parent().find(".client-amount").val("1170");
      $(this).parent().parent().find(".label").removeClass("active");
      $(this).parent().parent().find('.label[data-sum="1170"').addClass("active");
    } else if ($(this).parent().find('.sum[data-sum="1170"]').length) {
      $(this).parent().find('.sum[data-sum="1590"]').addClass("active");
      $(this).parent().find(".client-amount").val("1590");
      $(this).parent().parent().find(".label").removeClass("active");
      $(this).parent().parent().find('.label[data-sum="1590"').addClass("active");
    } else {
      $(this).parent().find('.sum[data-sum="1000"]').addClass("active");
      $(this).parent().find(".client-amount").val("1000");
      $(this).parent().parent().find(".label").removeClass("active");
      $(this).parent().parent().find('.label[data-sum="1000"').addClass("active");
    }
  }
});

$(".payment .checkbox").click(function () {
  $(this).toggleClass("active");
  console.log("test1");
});
$(".payment .checkbox-text").click(function () {
  $(this).parent().find(".checkbox").toggleClass("active");
  console.log("test2");
});

var clientIdN = "",
  namePref = "";

var urlParams = new URLSearchParams(window.location.search),
  utm_source = urlParams.get("utm_source"),
  utm_medium = urlParams.get("utm_medium"),
  utm_campaign = urlParams.get("utm_campaign"),
  utm_content = urlParams.get("utm_content"),
  utm_term = urlParams.get("utm_term");

if (utm_source) {
  utm_source = utm_source.toLowerCase();
}
if (utm_medium) {
  utm_medium = utm_medium.toLowerCase();
}
if (utm_campaign) {
  utm_campaign = utm_campaign.toLowerCase();
}
if (utm_content) {
  utm_content = utm_content.toLowerCase();
}
if (utm_term) {
  utm_term = utm_term.toLowerCase();
}

var get_referrer = document.referrer;
var get_referrerURL = "";
if (get_referrer) {
  get_referrerURL = new URL(get_referrer);
}

if (!sessionStorage.getItem("fisrt")) {
  sessionStorage.setItem("referrer", get_referrer);
  if (!utm_source && get_referrerURL) {
    utm_source = get_referrerURL.searchParams.get("utm_source");
  }
  sessionStorage.setItem("utm_source", utm_source);
  if (!utm_medium && get_referrerURL) {
    utm_medium = get_referrerURL.searchParams.get("utm_medium");
  }
  sessionStorage.setItem("utm_medium", utm_medium);
  if (!utm_campaign && get_referrerURL) {
    utm_campaign = get_referrerURL.searchParams.get("utm_campaign");
  }
  sessionStorage.setItem("utm_campaign", utm_campaign);
  if (!utm_content && get_referrerURL) {
    utm_content = get_referrerURL.searchParams.get("utm_content");
  }
  sessionStorage.setItem("utm_content", utm_content);
  if (!utm_term && get_referrerURL) {
    utm_term = get_referrerURL.searchParams.get("utm_term");
  }
  sessionStorage.setItem("utm_term", utm_term);
  console.log("set term");
} else {
  get_referrer = sessionStorage.getItem("referrer");
  utm_source = sessionStorage.getItem("utm_source");
  utm_medium = sessionStorage.getItem("utm_medium");
  utm_campaign = sessionStorage.getItem("utm_campaign");
  utm_content = sessionStorage.getItem("utm_content");
  utm_term = sessionStorage.getItem("utm_term");
  console.log("get term");
}
sessionStorage.setItem("fisrt", true);

if (utm_source == "telegram") {
  if (utm_medium == "cpm") {
    namePref = "taa";
  } else {
    namePref = "ttt";
  }
} else if (utm_source == "vk") {
  if (utm_medium == "cpm") {
    namePref = "rrr";
  } else if (utm_medium == "sm") {
    namePref = "ccc";
  } else if (utm_medium == "social" && utm_campaign == "newmp") {
    namePref = "nvv";
  } else {
    namePref = "vvv";
  }
} else if (utm_source == "vkads") {
  namePref = "rrr";
} else if (utm_source == "unisender") {
  namePref = "uuu";
} else if (utm_source == "dzen") {
  namePref = "ddd";
} else if (utm_source == "promostr") {
  namePref = "ppp";
} else if (utm_source == "ozon") {
  namePref = "zzz";
} else if (utm_source == "ok") {
  namePref = "ooo";
} else if (utm_source == "sberads") {
  namePref = "sber";
  // START OLD
} else if (utm_source == "tg") {
  namePref = "ttt";
} else if (utm_source == "tgads") {
  namePref = "taa";
} else if (utm_source == "yandex") {
  namePref = "yyy";
} else if (utm_source == "ymarket") {
  namePref = "mmm";
  // END OLD
} else {
  var user_ref = get_referrer;
  if (user_ref != "") {
    var search_systems = ["google", "ya", "yandex", "bing", "yahoo", "duckduckgo"];
    var user_ref = new URL(user_ref).hostname,
      user_ref = user_ref.replace("www.", ""),
      user_ref = user_ref.replace("search.", ""),
      user_ref = user_ref.split(".")[0];

    if (search_systems.includes(user_ref)) {
      namePref = "sss";
    }
  }
}

clientIdN = namePref;
$(".client-id").val(clientIdN);

function metrika_fn() {
  if (clientIdN && clientIdN != namePref) {
    clearInterval(metrika_interval);
    console.log(clientIdN);
  } else {
    ym(90336732, "getClientID", function (clientID) {
      clientIdN = namePref + clientID;
    });
    $(".client-id").val(clientIdN);
    console.log("set id");
  }
}
var metrika_interval = setInterval(metrika_fn, 500);

setTimeout(() => {
  clearInterval(metrika_interval);
}, 10000);

// рекуррентные платежи клауд
this.payRec = function (amount, formTarget, offsetTop, recurrent = true) {
  var widget = new cp.CloudPayments();
  var data = {};
  data.CloudPayments = {
    form_target: formTarget,
    utm_source: utm_source,
    utm_medium: utm_medium,
    utm_campaign: utm_campaign,
    utm_content: utm_content,
    utm_term: utm_term,
    referrer: get_referrer,
    //чек для первого платежа
    recurrent: {
      interval: "Month",
      period: 1, //чек для регулярных платежей
    },
  };
  widget.pay(
    "charge", // или 'charge'
    {
      //options
      publicId: "pk_ab64d112b4702538486c778381da5", //id из личного кабинета боевой
      description: "Подписка (ежемесячные платежи) " + clientIdN, //назначение
      amount: amount, //сумма
      currency: "RUB", //валюта
      skin: "mini", //дизайн виджета
      accountId: clientIdN,
      requireEmail: true,
      data: data,
    },
    {
      onSuccess: function (options) { },
      onFail: function (reason, options) {
        window.scrollTo(0, offsetTop);
      },
      onComplete: function (paymentResult, options) {
        if (paymentResult.success == true) {
          var goalParams = {
            order_price: amount,
            currency: "RUB",
          };
          ym(90336732, "reachGoal", "payCloud", goalParams);

          if (typeof _tmr !== "undefined") {
            _tmr.push({ type: "reachGoal", id: 3516740, goal: "paymentcp" });
          }

          let Data = new Date();
          let Year = Data.getFullYear();
          let Month = Data.getMonth();
          Month = Month + 1;
          if (Month < 10) {
            Month = "0" + Month;
          }
          let Day = Data.getDate();
          if (Day < 10) {
            Day = "0" + Day;
          }
          let Hour = Data.getHours();
          if (Hour < 10) {
            Hour = "0" + Hour;
          }
          let Minutes = Data.getMinutes();
          if (Minutes < 10) {
            Minutes = "0" + Minutes;
          }
          let utm_Date = Day + "." + Month + "." + Year;
          let utm_Time = Hour + ":" + Minutes;
          $.ajax({
            url:
              "https://api.unisender.com/ru/api/subscribe?format=json" +
              "&api_key=6y5x3g344j4fy6bh3twxp66647gzej8jz9bw6wjo" +
              "&list_ids=276" +
              "&fields[email]=" +
              paymentResult.email +
              "&fields[sum]=" +
              amount +
              "&fields[date]=" +
              utm_Date +
              "&fields[time]=" +
              utm_Time +
              "&double_optin=3",
            method: "GET",
            dataType: "JSONP",
            success: function (data) {
              console.log(data);
            },
          });

          if (utm_source == "unisender") {
            window.location.replace("https://krilyazhizni.ru/thankspage.html");
          } else {
            window.location.replace(
              "https://krilyazhizni.ru/main/thanks.html?list_ids=276&sum=" +
              amount +
              "&date=" +
              Day +
              "." +
              Month +
              "." +
              Year +
              "&time=" +
              Hour +
              ":" +
              Minutes
            );
          }
        }
      },
    }
  );
};

function widgetClaudpaymentsDefault(clientId, clientAmount, formTarget) {
  $.ajax({
    type: "POST",
    url: "/football/vendors/yookassa/yookassa.php",
    dataType: "JSON",
    data: {
      clientid: clientId,
      amount: parseInt(clientAmount),
      form_target: formTarget,
      utm_source: utm_source,
      utm_medium: utm_medium,
      utm_campaign: utm_campaign,
      utm_content: utm_content,
      utm_term: utm_term,
      referrer: get_referrer,
    },
    success: (data) => {
      // console.log(data);

      myWidget(data.confirmation.confirmation_token, data.amount.value);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(textStatus + " " + errorThrown);
    },
  });

  //Инициализация виджета. Все параметры обязательные, кроме объекта customization.

  function myWidget(data, amount) {
    const checkout = new window.YooMoneyCheckoutWidget({
      confirmation_token: data, //Токен, который перед проведением оплаты нужно получить от ЮKassa

      //Настройка виджета
      customization: {
        //Выбор способа оплаты для отображения
        // payment_methods: ['sbp'],
        modal: true,
      },
      error_callback: function (error) {
        //Обработка ошибок инициализации
        console.log(error);
      },
    });

    checkout.on("success", () => {
      //Код, который нужно выполнить после успешной оплаты.

      let Data = new Date();
      let Year = Data.getFullYear();
      let Month = Data.getMonth();

      Month = Month + 1;
      if (Month < 10) {
        Month = "0" + Month;
      }
      let Day = Data.getDate();
      if (Day < 10) {
        Day = "0" + Day;
      }
      let Hour = Data.getHours();
      if (Hour < 10) {
        Hour = "0" + Hour;
      }
      let Minutes = Data.getMinutes();
      if (Minutes < 10) {
        Minutes = "0" + Minutes;
      }

      if (utm_source == "unisender") {
        window.location.replace("https://krilyazhizni.ru/thankspage.html");
      } else {
        window.location.replace(
          "https://krilyazhizni.ru/thanks.html?list_ids=277&sum=" +
          clientAmount +
          "&date=" +
          Day +
          "." +
          Month +
          "." +
          Year +
          "&time=" +
          Hour +
          ":" +
          Minutes
        );
      }

      //Удаление инициализированного виджета
      checkout.destroy();
    });

    checkout.on("fail", () => {
      //Код, который нужно выполнить после неудачной оплаты.
      let Data = new Date();
      let Year = Data.getFullYear();
      let Month = Data.getMonth();

      Month = Month + 1;
      if (Month < 10) {
        Month = "0" + Month;
      }
      let Day = Data.getDate();
      if (Day < 10) {
        Day = "0" + Day;
      }
      let Hour = Data.getHours();
      if (Hour < 10) {
        Hour = "0" + Hour;
      }
      let Minutes = Data.getMinutes();
      if (Minutes < 10) {
        Minutes = "0" + Minutes;
      }
      //	window.location.replace("https://daylapu-help.ru/thanks.html?list_ids=2&sum=" + clientAmount + "&date=" + Day + '.' + Month + '.' + Year + '&time=' + Hour + ':' + Minutes);

      //Удаление инициализированного виджета
      checkout.destroy();
    });

    //Отображение платежной формы в контейнере
    checkout.render("payment-form");
  }
}

$(".open-widget").click(function () {
  // отменяем отправку формы при клике на кнопку
  $(this)
    .parent()
    .submit(function (e) {
      e.preventDefault();
      return false;
    });

  var inputError = false;

  let clientId = $(".form-widget").find(".client-id").val();
  let clientAmount = $(this).parent().find(".client-amount").val();
  let formTarget = $(this).parent().find(".form-target").val(),
    offsetTop = window.pageYOffset || document.documentElement.scrollTop;
  $(this).parent().find('input[type="submit"]').trigger("click");

  var goalParamsCart = {
    order_price: clientAmount,
    currency: "RUB",
  };
  ym(90336732, "reachGoal", "addToCard", goalParamsCart);

  if (typeof _tmr !== "undefined") {
    _tmr.push({ type: "reachGoal", id: 3516740, goal: "addToCart" });
  }

  $(".popup-rec .client-id-2").val(clientId);
  $(".popup-rec .client-amount-2").val(clientAmount);

  let isRec = $(this).parent().find(".checkbox").hasClass("active");

  if (isRec == false) {
    widgetClaudpaymentsDefault(clientId, clientAmount, formTarget);
  } else {
    // $(".popup-rec").show();
    // $(".overlay").addClass("active");
    payRec(parseInt(clientAmount), formTarget, offsetTop, true);
  }
});



$(".payment-cloud").click(function () {

  let clientAmount = $(this).parent().parent().find(".client-amount").val();
  let formTarget = $(this).parent().parent().find(".form-target").val(),
    offsetTop = window.pageYOffset || document.documentElement.scrollTop;


  var goalParamsCart = {
    order_price: clientAmount,
    currency: "RUB",
  };
  ym(90336732, "reachGoal", "addToCard", goalParamsCart);

  if (typeof _tmr !== "undefined") {
    _tmr.push({ type: "reachGoal", id: 3516740, goal: "addToCart" });
  }

  payRec(parseInt(clientAmount), formTarget, offsetTop, true);
});

$(".payment-yookassa").click(function () {

  let clientId = $(this).parent().parent().find(".client-id").val();
  let clientAmount = $(this).parent().parent().find(".client-amount").val();
  let formTarget = $(this).parent().parent().find(".form-target").val();


  var goalParamsCart = {
    order_price: clientAmount,
    currency: "RUB",
  };
  ym(90336732, "reachGoal", "addToCard", goalParamsCart);

  if (typeof _tmr !== "undefined") {
    _tmr.push({ type: "reachGoal", id: 3516740, goal: "addToCart" });
  }
  console.log('adsasddsa');
  console.log(clientId);
  console.log(clientAmount);
  widgetClaudpaymentsDefault(clientId, clientAmount, formTarget);
});

$(".popup-rec .close").click(function () {
  $(".popup-rec").hide();
});
