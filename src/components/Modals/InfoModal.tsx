import { FC } from 'react';
import { GithubLogo } from '../GithubLogo';

export const InfoModal: FC = () => {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="font-heading text-xl mb-4 text-center">Spelregler</h2>
        <h3 className="font-heading text-base font-medium">
          Skapa ord med bokstäverna på spelbrädet
        </h3>
        <ul className="list-disc list-inside text-[14px]">
          <li>Ord måste innehålla bokstaven i mitten</li>
          <li>Ord måste vara minst 4 bokstäver långa</li>
          <li>Bokstäverna kan användas flera gånger</li>
        </ul>
      </div>
      <div>
        <h3 className="font-heading text-base font-medium">Poäng</h3>
        <ul className="list-disc list-inside text-[14px]">
          <li>Ord med 4 bokstäver ger 1 poäng</li>
          <li>Ord längre än 4 bokstäver ger 1 poäng per bokstav</li>
          <li>Panagram (alla bokstäver en gång) ger 25 extra poäng</li>
        </ul>
      </div>
      <div className="mt-8">
        <h3 className="font-heading text-base font-medium">Felaktiga ord</h3>
        <p className="text-[14px]">
          Stöd för inrapportering av lanseras senare
        </p>
        <p className="text-[14px] line-through">
          Felaktiga, stötande eller ord som saknas uppdateras löpande. Skicka
          ett mail till{' '}
          <a
            // href="mailto:stafvett@badanka.dev"
            href="#"
            className="text-purple-800 dark:text-purple-300 underline"
          >
            _______@____.___
            {/* stafvett@badanka.dev */}
          </a>
        </p>
        <div className="mt-8">
          <a href="https://github.com/H4zze/stafvett">
            <GithubLogo size={32} />
          </a>
        </div>
      </div>
    </div>
  );
};
InfoModal.displayName = 'InfoModal';
