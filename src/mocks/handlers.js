import { http, HttpResponse } from 'msw';

// import people from './dummy.json';

const petsitterList = [
  {
    petsitterHashTags: [{
      hashTagName: '태그',
      petSitterHashTagId: 1,
    }],
    petSitterId: 1,
    petSitterRepresentativeHouse: '',
    review_count: 2,
    star_rate: 4,
    userName: '펫시터1',
  },
  {
    petsitterHashTags: [{
      hashTagName: '태그',
      petSitterHashTagId: 1,
    }],
    petSitterId: 2,
    petSitterRepresentativeHouse: '',
    review_count: 2,
    star_rate: 4,
    userName: '펫시터1',
  },
  {
    petsitterHashTags: [{
      hashTagName: '태그',
      petSitterHashTagId: 1,
    }],
    petSitterId: 3,
    petSitterRepresentativeHouse: '',
    review_count: 2,
    star_rate: 4,
    userName: '펫시터1',
  },
  {
    petsitterHashTags: [{
      hashTagName: '태그',
      petSitterHashTagId: 1,
    }],
    petSitterId: 4,
    petSitterRepresentativeHouse: '',
    review_count: 2,
    star_rate: 4,
    userName: '펫시터1',
  },
  {
    petsitterHashTags: [{
      hashTagName: '태그',
      petSitterHashTagId: 1,
    }],
    petSitterId: 5,
    petSitterRepresentativeHouse: '',
    review_count: 2,
    star_rate: 4,
    userName: '펫시터1',
  },
  {
    petsitterHashTags: [{
      hashTagName: '태그',
      petSitterHashTagId: 1,
    }],
    petSitterId: 6,
    petSitterRepresentativeHouse: '',
    review_count: 2,
    star_rate: 4,
    userName: '펫시터1',
  },
  {
    petsitterHashTags: [{
      hashTagName: '태그',
      petSitterHashTagId: 1,
    }],
    petSitterId: 7,
    petSitterRepresentativeHouse: '',
    review_count: 2,
    star_rate: 4,
    userName: '펫시터1',
  },
  {
    petsitterHashTags: [{
      hashTagName: '태그',
      petSitterHashTagId: 1,
    }],
    petSitterId: 8,
    petSitterRepresentativeHouse: '',
    review_count: 2,
    star_rate: 4,
    userName: '펫시터1',
  },
  {
    petsitterHashTags: [{
      hashTagName: '태그',
      petSitterHashTagId: 1,
    }],
    petSitterId: 9,
    petSitterRepresentativeHouse: '',
    review_count: 2,
    star_rate: 4,
    userName: '펫시터1',
  },
  {
    petsitterHashTags: [{
      hashTagName: '태그',
      petSitterHashTagId: 1,
    }],
    petSitterId: 10,
    petSitterRepresentativeHouse: '',
    review_count: 2,
    star_rate: 4,
    userName: '펫시터1',
  },
];

export const handlers = [
  http.get('https://withpet.site/api/v1/show-services', () => {
    return HttpResponse.json({
      resultCode: 'SUCCESS',
      result: [{
        serviceId: 0,
        serviceImg: 'string',
        serviceIntroduction: 'string',
        serviceName: '옵션1',
      },
      {
        serviceId: 1,
        serviceImg: 'string',
        serviceIntroduction: 'string',
        serviceName: '옵션2',
      }],
    });
  }),

  http.get('https://withpet.site/api/v1/show-petsitter', ({ request }) => {
    const url = new URL(request.url);
    const address = url.searchParams.get('address');
    const dogSize = url.searchParams.get('dogSize');
    const service = url.searchParams.get('service');
    const page = url.searchParams.get('page');

    console.log('address:', address, 'dogSizd:', dogSize, 'service:', service, 'page:', page);
    return HttpResponse.json({
      resultCode: 'SUCCESS',
      result: {
        content: petsitterList,
        pageable: {
          sort: {
            empty: false,
            sorted: true,
            unsorted: false,
          },
          offset: 0,
          pageNumber: 0,
          pageSize: 10,
          paged: true,
          unpaged: false,
        },
        totalPages: 1,
        totalElements: 1,
        last: true,
        size: 10,
        number: 0,
        sort: {
          empty: false,
          sorted: true,
          unsorted: false,
        },
        numberOfElements: 0,
        first: true,
        empty: true,
      },
    });
  }),

  http.get('https://withpet.site/api/v1/users/my-info', () => {
    return HttpResponse.json({
      result: {
        address: {
          Required: 'detailAdr,streetAdr,zipcode',
          detailAdr: 'string',
          streetAdr: 'string',
          zipcode: 'string',
        },
      },
      resultCode: 'SUCCESS',
    });
  }),
  http.get('https://withpet.site/api/v1/petsitter', ({ params }) => {
    const { petsitterId } = params;
    console.log(petsitterId);
    // petsitterId 들고오기
    return HttpResponse.json({
      resultCode: 'SUCCESS',
      result: {
        introduction: '',
        petSitterAddress: '',
        petSitterCriticalService: [
          {
            petSitterSserviceId: 1,
            price: 100,
            serviceId: 1,
            serviceImg: '',
            serviceIntroduction: '',
            serviceName: '산책',
          },
        ],
        petSitterHashTags: [
          {
            hashTagName: '테스트',
            petSitterHashTagId: 1,
          },
        ],
        petSitterHouse: [
          {
            houseId: 1,
            houseImg: '',
            representative: true,
          },
        ],
        petSitterId: 1,
        petSitterLicenseImg: '',
        petSitterName: '펫시터1',
        petSitterProfileImg: '',
        petSitterServices: [],
        petSitterUserId: 1,
        reviewResponse: [],
      },
    });
  }),
];

export default handlers;
