import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import playwright from "playwright";
import { useEffect } from "react";

export const loader = async () => {
  const browser = await playwright.chromium.launch({
    headless: true, // setting this to true will not run the UI
  });
  const page = await browser.newPage();
  await page.goto("https://www.chotot.com/mua-ban?page=1");
  const list = await page.locator("div > li > a");
  const linksArr = await list.evaluateAll((list) =>
    list.map((element) => {
      console.log(element.getAttribute("href"));
      const href = element.getAttribute("href");
      return href?.includes("https") ? href : `https://www.chotot.com${href}`;
    })
  );
  // const phoneNumbers: any = [];
  // linksArr.forEach(async (link) => {
  //   await page.goto(link);
  //   await page
  //     .locator(".LeadButton_showPhoneButton__1KVb-")
  //     .click({ button: "left" });
  //   const phoneNumber = await page.locator(".sc-ifAKCX").allInnerTexts();
  //   phoneNumbers.push(phoneNumber);
  // });
  await page.waitForTimeout(1000);
  await browser.close();
  return json(linksArr);
};

export default function Index() {
  // const loaderData = useLoaderData();
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const browser = await playwright.chromium.launch({
  //       headless: true, // setting this to true will not run the UI
  //     });
  //     const page = await browser.newPage();
  //     await page.goto("https://www.chotot.com/mua-ban?page=1");
  //     const list = await page.locator("div > li > a");
  //     const linksArr = await list.evaluateAll((list) =>
  //       list.map((element) => {
  //         console.log(element.getAttribute("href"));
  //         const href = element.getAttribute("href");
  //         return href?.includes("https")
  //           ? href
  //           : `https://www.chotot.com${href}`;
  //       })
  //     );
  //     console.log(`UseEffect`, linksArr);
  //   };
  //   fetchData().catch(console.error);
  // });
  // const fetcher = useFetcher();
  // const [data, setData] = useState();
  // const [count, setCount] = useState(1);

  // useEffect(() => {
  //   let isSubscribed = true;
  //   fetcher.load("/?index");
  //   console.log(`fetcher`, fetcher.data);
  //   const fetchData = async () => {
  //     // const data = await fetch(
  //     //   `https://gateway.chotot.com/v1/public/recommender/homepage?fingerprint=undefined&page=${count}`,
  //     //   { mode: "no-cors" }
  //     // );
  //     fetcher.load("/?index");
  //     console.log(`fetcher`, fetcher.data);
  //     // console.log(`json`, json);
  //     // if (isSubscribed) {
  //     //   setData(json);
  //     // }
  //   };

  //   fetchData().catch(console.error);
  //   return () => {
  //     isSubscribed = false;
  //   };
  // }, []);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix</h1>
      <ul>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/blog"
            rel="noreferrer"
          >
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/jokes"
            rel="noreferrer"
          >
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
    </div>
  );
}
