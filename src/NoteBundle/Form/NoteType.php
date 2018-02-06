<?php


namespace NoteBundle\Form;


use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class NoteType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {

        $builder->add('title', TextType::class, array('empty_data' => "no_title"));
        $builder->add('note', TextareaType::class);
        $builder->add('type', TextType::class, array('mapped' => false));
        $builder->add('note_type', TextType::class);
        $builder->add('status', TextType::class);
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class'        => 'NoteBundle\Entity\Note',
            'csrf_protection'   => false
        ));
    }




}