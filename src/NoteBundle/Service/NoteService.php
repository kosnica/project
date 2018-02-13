<?php

namespace NoteBundle\Service;

use Doctrine\ORM\EntityManager;
use NoteBundle\Entity\Note;
use NoteBundle\Entity\NoteType;


class NoteService
{

    /**
     * @var EntityManager
     */
    private $em;

    public function __construct(EntityManager $entityManager)
    {
        $this->em = $entityManager;
    }

    /**
     *
     * @return array $arrData Array of all notes
     */

    public function getAllNotes()
    {
        return $this->em->getRepository(Note::class)->findAll();
    }

    /**
     * @param object Note
     *
     */

    public function flushNote($data)
    {
        $this->em->persist($data);
        $this->em->flush();
    }

    /**
     *
     * @return array $arrIndexes Array of ids from removed records
     */

    public function removeAll()
    {
        $notes = $this->em->getRepository(Note::class)->findByStatus('deleted');
        $arrIndexes = array();

        if (count($notes) > 0)
        {
            foreach ($notes as $objNote)
            {
                $objNote->setStatus('removed');
                $arrIndexes[] = $objNote->getId();
                $this->em->persist($objNote);
            }

            $this->em->flush();
        }

        return $arrIndexes;
    }

    /**
     * @param string $strType
     *
     * @return object NoteType
     */

    public function setNoteType($strType)
    {
        return $this->em->getRepository(NoteType::class)->findOneByAlias($strType);
    }

    /**
     *
     * @return array $arrData Array of notes types
     */

    public function getAllTypes()
    {
        return $this->em->getRepository(NoteType::class)->findAll();
    }
}