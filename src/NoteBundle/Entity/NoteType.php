<?php

namespace NoteBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
/**
 * NoteType
 */
class NoteType
{
    /**
     * @var int
     */
    private $id;
    
    private $note;

    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }
    /**
     * @var string
     */
    private $alias;

    /**
     * @var string
     */
    private $name;
    
    public function __construct()
    {
        $this->note = new ArrayCollection();
    }

    /**
     * Set alias
     *
     * @param string $alias
     * @return NoteType
     */
    public function setAlias($alias)
    {
        $this->alias = $alias;

        return $this;
    }

    /**
     * Get alias
     *
     * @return string 
     */
    public function getAlias()
    {
        return $this->alias;
    }

    /**
     * Set name
     *
     * @param string $name
     * @return NoteType
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string 
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Add note
     *
     * @param \NoteBundle\Entity\Note $note
     * @return NoteType
     */
    public function addNote(\NoteBundle\Entity\Note $note)
    {
        $this->note[] = $note;

        return $this;
    }

    /**
     * Remove note
     *
     * @param \NoteBundle\Entity\Note $note
     */
    public function removeNote(\NoteBundle\Entity\Note $note)
    {
        $this->note->removeElement($note);
    }

    /**
     * Get note
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getNote()
    {
        return $this->note;
    }
}
