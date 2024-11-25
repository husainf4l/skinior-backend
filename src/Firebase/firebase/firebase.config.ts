import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';

dotenv.config();

export const firebasePoint = admin.initializeApp({
    credential: admin.credential.cert({
        projectId: 'points-jordan',
        clientEmail: 'firebase-adminsdk-7enkw@points-jordan.iam.gserviceaccount.com',
        privateKey: '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQD9HaICqmzE8wyA\nYC3x2aEMMUsokNDZ8slN/JyNptl2mOaQ4pnDChbdJIt4J9KPjbafqK7FWFEXsxIp\nAA1RYk2eFG1rN66fuWdY+ZXKd8sG0HCxYpQneM1xzJerFZn97qQNOJs041tTcKC1\n45nK6YTSmi2O+PefLkcrBmut8BKkNfO3yO0wOYDZ2gAjIm4cigrMJ0FqkhnYkNCI\nRuUv1C7xZiG6y/tvBNDBa/Aj6OsgSg9uzySIKskDBV81VJaKENfD5EDK8o9iDx2e\nfYimsiC4So15XevYEVlutGqKSM/1f3eD+yH7O+MUD2HLC3DV+S1QVzLlXvi4Bz2e\nfFRPGnFjAgMBAAECggEAJhgO8/vA7FCasbodRWg4Nro3J4nJWk6R7Bd4Bab2KkU6\nHirHHXV9RMG6mSt/zcnJkcnfU9AblEeHv31Eg9pu+BBMT3X35WNlTHIeZcnAV+wy\n/woTu2+7lm7w50y++lqvfKs89f6/FesTejcg7vWqNHqudKAVFHNF6WcepEpHY/Mg\nyuG4IDxn+wkQ569L5fmuHGXFtRRkHF0/mfhrfYGoeqzZXMq0IDrOP6wK96CRMCcP\nq75ggW5y5a/Zv0uzHD6VrDYErgt2+oxpR1LBbLuSk1pUbdZvSJ8qan9bZI5On192\ngZk8b9TjhwGck69YCUocG3URuI4qG7Uxwe6RWpfFsQKBgQD/wkbRqM6p8BMlC31J\nwpX8V8ek7t8ixyMQm8DVriy6lQvIO1T+0tUikljBN5ItB76hj19yrS9zY/UjAQqK\nryY2d//ZZKVTl5F0jpB74YVyXp8Go86NZm95uM10laVgK9zzbXLdjuvwldBrCr67\nbhIJXRYGx8Y3geyngyPuAcY2BwKBgQD9Wrfk53QKBhwGAIFr/OzfmHz400SKR+pn\nBfneAQtuthZQCttxOfMOGaD3SOw4dlsWuwd9HtHm9tcUjODeBUPmLUp8k7f8FJlH\n3CvgH8Pk1MaTwVy1+GmCBdTQB4YhEQ9bGprvuym05Yz+m5WdLq13qCDfEw/jD0JU\nCA+oj26yxQKBgDaam9QXXkgZ4Xx/P3iH+s2tUAp+lVUvfuUE297DGPmc6K8PO85L\n5QVEiX53BtZmWOTVX2N0ZjUUmjmm90E0s8vdQtp/Cm0WZw+jgGVyeLM6UGlyf57g\nx9wNAJBrgqtNshamv2deJDFxStYPrTkG/wLQxOsdq8weCRCahwlBh7fxAoGBAJTZ\nf8FU2rAo9r3v/hnb969Gf+YQ+evkZKsyr6LnKjhZcrKELnlPeqWGGTQv+9kQcGPi\nbnvsZ5Yy4BqKynKm1UWexmx6vVW1JHk7uetrvkPrXt/gcv/WeuaRVn8CbKNwynzU\nHMNMSyyk0TmlXzmB+xiaBvYI1QSqKmYEdm6qFnehAoGBALY2iNYLS9TJr+TyDMer\ntTqaV9HpWsdDNx2pe9rdvDboiIAKH76i7PBbZO84FFZ/sewWJd983AFKQgOi/a0P\nfDrieDKDr1z1veCyfjyUwejW+osDmpkGUBPYaqEwwMqZvn2fbRrlKEYy6P8MLIas\nt85clWlmdQJe6t3Rn82hgWoI\n-----END PRIVATE KEY-----\n',
    }),
}, 'point');

export const firebasePointVs1 = admin.initializeApp({
    credential: admin.credential.cert({
        projectId: 'pointsv1',
        clientEmail: "firebase-adminsdk-xzk1c@pointsv1.iam.gserviceaccount.com",
        privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDFJmypCCrwDfry\nBprNE1aZ9x6XbNX/FOHnO5GdmA+wQ4AzjDX+SL+WzS545tnEe9DFKwGwWUfyPasb\nc+jukPZWPkJP0BEwg/hCr8kSfcOHDlSgtpEFDwVLSJnDcvNtSTfTcAhUofyXM4zY\nEeWCG6cSLLiTOmFRlpn8UjIcvPHKYx8KvPFp4u2MREToB7Id93EdhioUOe0Urxv7\nADua+NZwI83Bc2GmN1DDqiZZ1c4Z2dOI3YrY9t3CQJDHAOwfdfHbMzFCnygl2zhb\np1LDVzl0+RVjWP23FKU5CmtdMGKBIh24+olhMTiP7SgcA5UVEUpXbN0f5xJ2VO/l\nVRfBpH0LAgMBAAECggEANxMY38+MTytYoyv9KrTwSGqkfSDGV0/6G6KkdyX3nAH/\nWmcc3kBsZTBEfzneM+ly1OHCwwTt+FoJ5s1mkN6mMkmKNMmnQ6paPCbnQOcpLB1w\nvsTBlmwvymwpqFQAdNMzaTmu2hW2fnbELcgyGTqoXYdouJhif2xW8An2Pdj6otK4\nRBQUJzuiBhbq866t997fSjyAq3oj1RnrUf0QE67uW9NKhpZs96+dbmVSBDgc8msF\naOqaLZ1WMaIKqkQxPa1gbAtqyG5DSttDQhlG5cHgsD10TkUBs9R5i6HSlY6Riuj0\nLpBOto3HkEeZHXfI/emttbQYv91NBMK839PsbPEIoQKBgQDqSfqBNRK/NbK82b7O\nEhk5gZ6zgqyI0kSRS0bb77oGhAu9AGCs3r4ZbYlLZfa/aUMyhysAhKgaZkNUs2LC\nCVGzadvuPki2xZqQ1KJhDAIp1VeoQ/kWyfTJfr6PlJRCp2yACys3GtNWI7S3FIqM\n3F4FApfKhF4Xje3NvmVDsI2X3QKBgQDXa2cZL51SRzrg5Sbqx0iq0CW7B4d49v7d\n+F/MRzJ6iB7phQt/R2GnOlkBTOKQlYSQuzkf//ggnLLz+ee4vhF6NshRAIUJt/lP\nzqkXF5SCbAgNtOsBQiqT9zcFWYNb9Nt+lmxqgl/soSTKOb4vdj5vO6NCUWWQGumn\nyxXqF4BOBwKBgQC0Vh8xBzYX4fBjdsNsgPfTkNckW4gMhLTslWHEduDclRUn9Lt1\nNLpkfjC4zZJBQXfM08ggzPtL3r0i3DU/H8c4b1ovJtf3f2B67IDUbFbZ9nJTfYak\nqOz3j8yEXhxEtfRJFs+7ybU0T6WRaok+5XylJJrL8lkujjumK1Bs6uACLQKBgEKi\nRlHUGKXKwruuJkuZOTEdEY641X7laBDhM0DNBSBB2s4BCX1lZx+DPOTaE3sFxOu/\n/fuYAfiUgAZX1wWeRWm4aF4l+wD2l3fIRSWPdbCiGhujSs4o2WLLpYlSFv/qzbpq\nbT7E9UcM0YR8OAgWW1ms6OMqqm/Y402z1COFAXshAoGAQeadNeqOusc5whdip0FC\nHq9EKpBFpRU4a5bFRSLTSbB0aKCfbyyYsdoeOYrXEhK+P1Uk3vxjlp63g/xwW2bi\nNcMYW3TnFftPUfdNOK/hw/L03hpWgV5JQNfiSVMV7NARVrXzFbGCPb6nhnQwDAr9\nF8MPUr4SENniVmh0xEcSD2M=\n-----END PRIVATE KEY-----\n",
    }),
}, 'pointvs1');


export const firestorePoint = firebasePoint.firestore();
export const firestorePointVs1 = firebasePointVs1.firestore();

