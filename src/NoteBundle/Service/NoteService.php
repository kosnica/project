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

    /**
     * @var array
     */
    private $arrFunctions = array('color' => 'setColor',
                                  'status' => 'setStatus');


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
        $arrNotes = $this->em->getRepository(Note::class)->findAll();
        $arrData = array();

        if (count($arrNotes) > 0)
        {
            foreach ($arrNotes as $objNote)
            {
                $arrData[] = $objNote;
            }
        }

        return $arrData;
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
     * @param object $objNote
     * @param string $value Attribute value
     * @param string $attribute Note entity attribute
     *
     * @return boolean true or false depending on whether the object exists
     */

    public function updateOneItem($objNote, $value, $attribute)
    {
        $strFunction = $this->arrFunctions[$attribute];
        $objNote->$strFunction($value);
        $this->em->persist($objNote);
        $this->em->flush();

        return true;
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
        $noteType = $this->em->getRepository(NoteType::class)->findOneByAlias($strType);
        return $noteType;
    }

    /**
     *
     * @return array $arrData Array of notes types
     */

    public function getAllTypes()
    {
        $noteType = $this->em->getRepository(NoteType::class)->findAll();
        $arrData = array();

        if (count($noteType) > 0)
        {
            foreach ($noteType as $objType)
            {
                if (is_object($objType))
                {
                    $strType = $objType->getAlias();
                    $arrData[$strType] = array('alias' => $strType,
                                                'name'  => $objType->getName());
                }
            }
        }

        return $arrData;
    }
}