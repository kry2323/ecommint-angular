export enum BREAKPOINT {
  xs = 'xs',
  sm = 'sm',
  md = 'md',
  lg = 'lg',
  xl = 'xl',
}

export interface BreakPoint {
  min?: number;
  max?: number;
}

export type LayoutSections =
  | 'header'
  | 'footer'
  | 'LandingPage2Template'
  | string;

export type LayoutBreakPoints = {
  [t in BREAKPOINT]?: number | BreakPoint;
};
export type SlotGroup = {
  /** The page slot configuration for large screens */
  [BREAKPOINT.lg]?: SlotConfig;
  /** The page slot configuration for medium screens */
  [BREAKPOINT.md]?: SlotConfig;
  /** The page slot configuration for small screens */
  [BREAKPOINT.sm]?: SlotConfig;
  /** The page slot configuration for extra small screens */
  [BREAKPOINT.xs]?: SlotConfig;
};

export type SlotConfig = {
  slots?: string[];
  pageFold?: string;
};

export type LayoutSlotConfig = {
  [section in LayoutSections]: SlotConfig | SlotGroup | LayoutSlotConfig;
};
export interface LayoutConfig{
  layoutSlots?: LayoutSlotConfig;
}
export const layoutConfig: LayoutConfig = {

  layoutSlots: {
    header: {
      lg: {
        slots: [
          'TopHeaderSlot',
          'MarketHeaderTopFull',
          'MagazaHeaderTopFull',
          'MarketHeaderCenterFull',
          'MagazaHeaderCenterFull',
          'MarketNavigationBar',
          'MagazaNavigationBar',
        ],
      },
      slots: [
        'TopHeaderSlot',
        'MarketHeaderTopFull',
        'MagazaHeaderTopFull',
        'MarketHeaderCenterFull',
        'MagazaHeaderCenterFull',
        'MarketNavigationBar',
        'MagazaNavigationBar',
      ],
    },
    navigation: {
      xs: {
        slots: ['SiteLogin', 'NavigationBar']
      }
    },
    footer: {
      slots: ['SocialMedia', 'Footer', 'TrustBadges', 'FooterBottom'],
    },
    LandingPage2Template: {
      pageFold: 'Section2B',
      slots: [
        'sectionStory',
        'Section1',
        'Section2C',
        'Section2A',
        'Section2D',
        'Section2B',
        'Section3',
        'Section4',
        'Section5',
        'Section6',
        'Section7',
        'Section8',
        'Section9',
        'Section10',
        'Section11',
        'Section12',
        'Section13',
        'Section14',
        'Section15',
        'SeoContent',
      ],
    },
    ProductDetailsPageTemplate: {
      lg: {
        pageFold: 'UpSelling',
        slots: [
          'Section1',
          'Summary',
          'CrossSelling',
          'Tabs',
          'UpSelling',
          'PlaceholderContentSlot',
        ],
      },
      pageFold: 'Summary',
      slots: [
        'Section1',
        'Summary',
        'CrossSelling',
        'Tabs',
        'MobileCarousel',
        'UpSelling',
        'PlaceholderContentSlot',
      ],
    },
    SearchResultsListPageTemplate: {
      slots: [
        'Section1',
        'ProductLeftRefinements',
        'SearchResultsListSlot',
      ],
    },
    IntroPageTemplate: {
      slots: [
        'IntroSiteLogo',
        'MagazaSelector',
        'MarketSelector',
      ],
      footer: {
        xl: {
          slots: ['FooterEtbis'],
        },
        lg: {
          slots: ['FooterEtbis'],
        },
        md: {
          slots: ['FooterEtbis'],
        },
      },
    },
    AccountPageTemplate: {
      slots: [
        'SideContent',
        'BodyContent'
      ]
    },
    LoginPageTemplate: {
      header: {
        lg: {
          slots: [
            'TopHeaderSlot',
            'MagazaHeaderTopStoreType',
            'MarketHeaderTopStoreType',
            'MagazaHeaderCenterLogo',
            'MarketHeaderCenterLogo',
          ],
        },
        slots: [
          'TopHeaderSlot',
          'MagazaMobileHeaderTopStoreType',
          'MarketMobileHeaderTopStoreType',
          'MagazaMobileHeaderCenterLogo',
          'MarketMobileHeaderCenterLogo',
        ],
      },
      xl: {
        slots: ['LeftContentSlot', 'RightContentSlot'],
      },
      lg: {
        slots: ['LeftContentSlot', 'RightContentSlot']
      },
      md: {
        slots: ['LeftContentSlot'],
      },
      xs: {
        slots: ['LeftContentSlot'],
      },
      footer: {
        slots: ['']
      }
    },
    CartPageTemplate: {
      slots: ['KasaOnuProductBanner', 'EmptyCartMiddleContent', 'TopContent', 'CenterRightContentSlot', 'CarouselContentSlot'],
    },
    RegisterPageTemplate: {
      header: {
        lg: {
          slots: [
            'TopHeaderSlot',
            'MagazaHeaderTopStoreType',
            'MarketHeaderTopStoreType',
            'MagazaHeaderCenterLogo',
            'MarketHeaderCenterLogo',
          ],
        },
        slots: [
          'TopHeaderSlot',
          'MagazaMobileHeaderTopStoreType',
          'MarketMobileHeaderTopStoreType',
          'MagazaMobileHeaderCenterLogo',
          'MarketMobileHeaderCenterLogo',
        ],
      },
      slots: [
        'BodyContent',
      ],
      footer: {
        slots: ['']
      }
    },
    BrandsMainPageTemplate: {
      slots: [
        'TopBodyContent',
        'BottomBodyContent'
      ]
    },
    AllCampaignsPageTemplate: {
      slots: [
        'MarketBannersContent',
        'MagazaBannersContent',
        'Section2A',
        'Section4',
        'Section8',
        'Section10',
        'Section12',
        'Section14',
      ]
    },
    StaticPageTemplate: {
      slots: [
        'SideContent',
        'BodyContent'
      ]
    },
    MultiStepCheckoutSummaryPageTemplate: {
      header: {
        lg: {
          slots: [
            'CheckoutHeaderCenterLogo',
            'MagazaCheckoutStep',
            'MarketCheckoutStep'
          ],
        },
        slots: [
          'CheckoutMobileHeaderCenterLogo',
          'MagazaMobileCheckoutStep',
          'MarketMobileCheckoutStep',
        ],
      },
      slots: [
        'BodyContent',
        'SideContent'
      ],
      footer: {
        slots: ['TrustBadges', 'FooterBottom'],
      },
    },
    CategoryPageTemplate: {
      slots: [
        'Section1',
        'Section2',
        'Section3',
        'Section4'
      ]
    },
    ForgottenPasswordPageTemplate: {
      header: {
        lg: {
          slots: [
            'TopHeaderSlot',
            'MagazaHeaderTopStoreType',
            'MarketHeaderTopStoreType',
            'MagazaHeaderCenterLogo',
            'MarketHeaderCenterLogo',
          ],
        },
        slots: [
          'TopHeaderSlot',
          'MagazaMobileHeaderTopStoreType',
          'MarketMobileHeaderTopStoreType',
          'MagazaMobileHeaderCenterLogo',
          'MarketMobileHeaderCenterLogo',
        ],
      },
      xl: {
        slots: ['LeftContentSlot'],
      },
      lg: {
        slots: ['LeftContentSlot']
      },
      md: {
        slots: ['LeftContentSlot'],
      },
      xs: {
        slots: ['LeftContentSlot'],
      },
    },
    ProductListPageTemplate: {
      pageFold: 'Section1',
      slots: [
        'ProductLeftRefinements',
        'Section1',
        'ProductListSlot',
      ],
    },
    DocumentPageTemplate: {
      header: {
        slots: ['']
      },
      slots: ['MainContent'],
      footer: {
        slots: ['']
      }
    },
    DocumentPageMobileTemplate: {
      header: {
        slots: ['']
      },
      slots: ['MainContent'],
      footer: {
        slots: ['']
      }
    },
    CampaignPageTemplate: {
      slots: [
        'Banner', 'CampaignInfo'
      ]
    },
    StaticPageMobileTemplate: {
      header: {
        slots: ['']
      },
      slots: [
        'SideContent',
        'BodyContent'
      ]
    },
    SizeChartMobileTemplate: {
      header: {
        slots: ['']
      },
      slots: [
        'BodyContent',
        'SizeChart'
      ]
    },
    ErrorPageTemplate: {
      header: {
        slots: ['']
      },
      slots: [
        'TopContent',
        'MiddleContent',
        'BottomContent'
      ],
      footer: {
        slots: ['']
      }
    },
    BrandSearchResultsListPageTemplate: {
      slots: [
        'ProductLeftRefinements',
        'SearchResultsListSlot',
      ],
    },
    OrderConfirmationPageTemplate: {
      slots: ['BodyContent', 'SideContent'],
    },
    StoreFinderPageTemplate: {
      slots: ['MiddleContent', 'SideContent'],
    },
  }
};
