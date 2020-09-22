import React from 'react';

import { StatusBold, StatusContent } from './styles';

interface SituationProps {
  segundo_semestre: boolean;
  quantidade_avaliacoes: number;
  nota_avaliacao_final: {
    nota: number;
  };
  nota_etapa_1: {
    nota: number;
  };
  nota_etapa_2: {
    nota: number;
  };
  nota_etapa_3: {
    nota: number;
  };
  nota_etapa_4: {
    nota: number;
  };
}

function calc({
  segundo_semestre,
  quantidade_avaliacoes,
  nota_avaliacao_final,
  nota_etapa_1,
  nota_etapa_2,
  nota_etapa_3,
  nota_etapa_4,
}: SituationProps) {
  if (quantidade_avaliacoes === 2) {
    const notaFinal = (nota_etapa_1.nota * 2 + nota_etapa_2.nota * 3) / 5;

    if (nota_etapa_1.nota !== null && nota_etapa_2.nota !== null) {
      if (notaFinal >= 60) return <StatusBold>Aprovado</StatusBold>;

      if (notaFinal >= 20) {
        const nM1 = 100 - (2 * nota_etapa_1.nota) / 3;
        const nM2 = 150 - (3 * nota_etapa_2.nota) / 2;

        const needed = Math.floor(Math.min(nM1, nM2));
        if (nota_avaliacao_final) {
          if (nota_avaliacao_final.nota >= needed) {
            return <StatusBold>Aprovado na Prova Final.</StatusBold>;
          }
          return <StatusBold>Reprovado</StatusBold>;
        }
        return (
          <StatusContent>
            Conquiste <StatusBold>{needed}</StatusBold> pontos na Prova Final
            para sua aprovação nesta matéria.
          </StatusContent>
        );
      }

      return <StatusBold>Reprovado</StatusBold>;
    }
    if (nota_etapa_1.nota !== null && !segundo_semestre) {
      const needed = Math.ceil((300 - 2 * nota_etapa_1.nota) / 3);

      return (
        <StatusContent>
          Conquiste <StatusBold>{needed}</StatusBold> pontos no 2° BI para sua
          aprovação nesta matéria.
        </StatusContent>
      );
    }
    if (nota_etapa_1.nota !== null && segundo_semestre) {
      const needed = Math.ceil((300 - 2 * nota_etapa_1.nota) / 3);

      return (
        <StatusContent>
          Conquiste <StatusBold>{needed}</StatusBold> pontos no 4° BI para sua
          aprovação nesta matéria.
        </StatusContent>
      );
    }
  }

  const notaFinal =
    (nota_etapa_1.nota * 2 +
      nota_etapa_2.nota * 2 +
      nota_etapa_3.nota * 3 +
      nota_etapa_4.nota * 3) /
    10;

  if (notaFinal > 60) {
    return <StatusBold>Aprovado</StatusBold>;
  }

  if (
    nota_etapa_1.nota !== null &&
    nota_etapa_2.nota !== null &&
    nota_etapa_3.nota !== null &&
    nota_etapa_4.nota !== null
  ) {
    if (notaFinal > 150) return <StatusBold>Aprovado</StatusBold>;
    if (notaFinal >= 20) {
      const nM1 =
        300 -
        nota_etapa_1.nota -
        (3 * nota_etapa_3.nota) / 2 -
        (3 * nota_etapa_4.nota) / 2;
      const nM2 =
        300 -
        nota_etapa_1.nota -
        (3 * nota_etapa_3.nota) / 2 -
        (3 * nota_etapa_4.nota) / 2;
      const nM3 =
        200 -
        nota_etapa_4.nota -
        (2 * nota_etapa_1.nota) / 3 -
        (2 * nota_etapa_2.nota) / 3;
      const nM4 =
        200 -
        nota_etapa_3.nota -
        (2 * nota_etapa_1.nota) / 3 -
        (2 * nota_etapa_2.nota) / 3;

      const needed = Math.ceil(Math.min(nM1, nM2, nM3, nM4));
      if (nota_avaliacao_final.nota) {
        if (nota_avaliacao_final.nota >= needed) {
          return <StatusBold>Aprovado na Prova Final.</StatusBold>;
        }
        return <StatusBold>Reprovado</StatusBold>;
      }
      return (
        <StatusContent>
          Conquiste <StatusBold>{needed}</StatusBold> pontos na Prova Final para
          sua aprovação nesta matéria.
        </StatusContent>
      );
    }
    return <StatusBold>Reprovado</StatusBold>;
  }
  if (
    nota_etapa_1.nota !== null &&
    nota_etapa_2.nota !== null &&
    nota_etapa_3.nota === null &&
    nota_etapa_4.nota === null
  ) {
    const needed = Math.ceil(
      (600 - (nota_etapa_1.nota * 2 + nota_etapa_2.nota * 2)) / 3,
    );

    if (needed <= 100) {
      return (
        <StatusContent>
          Conquiste <StatusBold>{needed}</StatusBold> pontos no 3° BI para sua
          aprovação nesta matéria.
        </StatusContent>
      );
    }

    return (
      <StatusContent>
        Conquiste <StatusBold>104</StatusBold> pontos nos próximos bimestres
        para sua aprovação nesta matéria.
      </StatusContent>
    );
  }
  if (
    nota_etapa_1.nota !== null &&
    nota_etapa_2.nota !== null &&
    nota_etapa_3.nota !== null &&
    nota_etapa_4.nota === null
  ) {
    const needed = Math.ceil(
      (600 -
        (nota_etapa_1.nota * 2 +
          nota_etapa_2.nota * 2 +
          nota_etapa_3.nota * 3)) /
        3,
    );

    return (
      <StatusContent>
        Conquiste <StatusBold>{needed}</StatusBold> pontos no 4° BI para sua
        aprovação nesta matéria.
      </StatusContent>
    );
  }

  return <StatusBold>Cursando</StatusBold>;
}

const AcademicSituation: React.FC<SituationProps> = ({
  segundo_semestre,
  quantidade_avaliacoes,
  nota_avaliacao_final,
  nota_etapa_1,
  nota_etapa_2,
  nota_etapa_3,
  nota_etapa_4,
}) => {
  return calc({
    segundo_semestre,
    quantidade_avaliacoes,
    nota_avaliacao_final,
    nota_etapa_1,
    nota_etapa_2,
    nota_etapa_3,
    nota_etapa_4,
  });
};

export default AcademicSituation;
