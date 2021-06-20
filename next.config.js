module.exports = (phase, { defaultConfig }) => {
  return {
    images: {
      domains: [
        "instagram.fbma2-1.fna.fbcdn.net",
        "www.instagram.com",
        "www.localhost:3000",
        "www.jemmastables.com",
        "firebasestorage.googleapis.com"
      ],
    },
    async rewrites() {
      return [
        {
          source: `/${encodeURIComponent('hästar')}/${encodeURIComponent('tävlingshästar')}`,
          destination: `/hastar/tavlingshastar`,
        },
        {
          source: `/${encodeURIComponent('hästar')}/${encodeURIComponent('tävlingshästar')}/:name`,
          destination: `/hastar/tavlingshastar/:name`,
        },
        {
          source: `/${encodeURIComponent('hästar')}/${encodeURIComponent('unghästar')}`,
          destination: `/hastar/unghastar`,
        },
        {
          source: `/${encodeURIComponent('hästar')}/${encodeURIComponent('unghästar')}/:name`,
          destination: `/hastar/unghastar/:name`,
        },
        {
          source: `/${encodeURIComponent('hästar')}/avelsto`,
          destination: `/hastar/avelsto`,
        },
        {
          source: `/${encodeURIComponent('hästar')}/avelsto/:name`,
          destination: `/hastar/avelsto/:name`,
        },
        {
          source: `/${encodeURIComponent('hästar')}`,
          destination: `/hastar`
        },
        {
          source: `/${encodeURIComponent('anläggningen')}`,
          destination: `/anlaggningen`
        },
        {
          source: `/${encodeURIComponent('anläggningen')}/hagarna`,
          destination: `/anlaggningen/hagarna`
        },
        {
          source: `/${encodeURIComponent('anläggningen')}/${encodeURIComponent('lösdriften')}`,
          destination: `/anlaggningen/losdriften`
        },
        {
          source: `/${encodeURIComponent('anläggningen')}/ridbanan`,
          destination: `/anlaggningen/ridbanan`
        },
        {
          source: `/${encodeURIComponent('anläggningen')}/stallet`,
          destination: `/anlaggningen/stallet`
        }
      ];
    },
  };
};
