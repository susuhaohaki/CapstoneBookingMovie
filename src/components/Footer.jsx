import Logo from "/logo.png";
const navigation = {
  partner: [
    {
      name: "Galaxy",
      href: "#",
      image:
        "https://cdn.moveek.com/storage/media/cache/square/5fffb30b3194c340097683.png",
    },
    {
      name: "CGV",
      href: "#",
      image:
        "https://cdn.moveek.com/storage/media/cache/square/524ba157cd271c9c24d15f367a57c13abc26af06.jpg",
    },
    {
      name: "BHD",
      href: "#",
      image:
        "https://cdn.moveek.com/storage/media/cache/square/dcc08eb55eca8002f729ae0dff98a2ae6c031db0.png",
    },
    {
      name: "Cinestar",
      href: "#",
      image:
        "https://cdn.moveek.com/storage/media/cache/square/59a2a1753d6416c84b4e05146280584a33448c14.png",
    },
    {
      name: "Mega GS",
      href: "#",
      image:
        "https://cdn.moveek.com/storage/media/cache/square/4e2f8af9e4d780495cbc387e5868c2a48c7f82c2.png",
    },
    {
      name: "Dcine",
      href: "#",
      image:
        "https://cdn.moveek.com/storage/media/cache/square/a1cd7de61579e7bca68c7bee4d76c4c7388478cb.png",
    },
    {
      name: "Beta Cinemas",
      href: "#",
      image:
        "https://cdn.moveek.com/storage/media/cache/square/5fffb2fcaf3c1018282624.png",
    },
    {
      name: "Lotte Cinema",
      href: "#",
      image:
        "https://cdn.moveek.com/storage/media/cache/square/38fee9d0c0a533a3d4fb4779d4efa8842a6d5bae.png",
    },
    {
      name: "Dong Da",
      href: "#",
      image:
        "https://cdn.moveek.com/storage/media/cache/square/6397446bee6da982816422.png",
    },
    {
      name: "Cinemax",
      href: "#",
      image: "https://cdn.moveek.com/bundles/ornweb/partners/cinemax.png",
    },
    {
      name: "Startlight",
      href: "#",
      image: "https://cdn.moveek.com/bundles/ornweb/partners/starlight.png",
    },
    {
      name: "Rio Cinema",
      href: "#",
      image: "https://cdn.moveek.com/bundles/ornweb/partners/rio.png",
    },
  ],
  company: [
    { name: "About", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Jobs", href: "#" },
    { name: "Press", href: "#" },
    { name: "Partners", href: "#" },
  ],
  legal: [
    { name: "Claim", href: "#" },
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
  ],
};

const Footer = () => {
  return (
    <footer aria-labelledby="footer-heading" className="bg-gray-900">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl sm:py-8 lg:px-4 lg:py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="flex gap-3">
            <img alt="Company name" src={Logo} className="h-14" />
            <p className="text-2xl font-bold leading-[4rem] text-orange-500">
              Booking Ticket
            </p>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="grid">
              <div>
                <h3 className="text-lg font-semibold leading-6 text-orange-500">
                  Partner
                </h3>
                <ul
                  role="list"
                  className="mt-6 flex flex-wrap items-center gap-3"
                >
                  {navigation.partner.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm leading-6 text-gray-300 hover:text-orange-500"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          width={48}
                          height={24}
                          className="rounded-full"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-lg font-semibold leading-6 text-orange-500">
                  Company
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm leading-6 text-gray-300 hover:text-orange-500"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-lg font-semibold leading-6 text-orange-500">
                  Legal
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm leading-6 text-gray-300 hover:text-orange-500"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
