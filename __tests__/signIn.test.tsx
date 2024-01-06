// import { render, fireEvent, waitFor } from '@testing-library/react';
// // import { userEvent } from '@testing-library/userEvent';
// import * as AuthContext from '@/context/AuthContext';
// import * as ReactRouter from 'next/router';
// import * as FirebaseConfig from '@/app/firebase/config';
// import Login from '@/app/(auth)/signin/page';
// import * as LocalizationContext from '@/context/localization';
// import { NextRouter } from 'next/router';

// import { mockLocalizationData } from '../mocks/mocks';

// jest.mock('next/router', () => ({
//   useRouter: jest.fn(),
// }));

// jest.mock('@/context/AuthContext', () => ({
//   useAuth: jest.fn(),
// }));

// jest.mock('@/app/firebase/config', () => ({
//   signIn: jest.fn(),
//   signInWithGoogle: jest.fn(),
// }));

// describe('Login Component', () => {
//   // Mock implementations
//   const mockPush = jest.fn();
//   const useRouterMock: jest.MockedFunction<
//     () => Partial<ReactRouter.NextRouter>
//   > = jest.mocked(ReactRouter.useRouter);
//   const useAuthMock: jest.MockedFunction<typeof AuthContext.useAuth> =
//     jest.mocked(AuthContext.useAuth);
//   const signInMock: jest.MockedFunction<typeof FirebaseConfig.signIn> =
//     jest.mocked(FirebaseConfig.signIn);
//   beforeEach(() => {
//     jest.clearAllMocks();
//     const mockUseRouter = () => {
//       const router: Partial<NextRouter> = {
//         push: jest.fn(),
//         // add other properties and methods you use from the useRouter hook
//       };
//       return router;
//     };
//     AuthContext.useAuth.mockReturnValue({ user: null });

//     jest.mock('@/context/localization', () => ({
//       ...jest.requireActual('@/context/localization'),
//       useContext: jest.fn(),
//     }));

//     LocalizationContext.useContext.mockReturnValue(mockLocalizationData);
//   });

//   it('renders with correct localization', () => {
//     const { getByText } = render(<Login />);
//     expect(mockLocalizationData.localization.EN.login).toBeInTheDocument();
//   });
// });
